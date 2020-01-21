import { connect } from 'tls'
import { connectMx } from './lib'

const CRLF = '\r\n'

/**
 * @param {string} domain
 * @param {string} host
 * @param {string} from
 * @param {!Array<string>} recipients Email addresses of those who should get the email.
 * @param {string} body The message to send.
 */
export async  function sendToSMTP(domain, host, from, recipients, body, {
  logger, rejectUnauthorized, autoEHLO, devHost, devPort, smtpHost, smtpPort,
}) {
  let sock = await connectMx(domain, {
    logger, devHost, devPort, smtpHost, smtpPort,
  })

  const w = (s) => {
    logger.debug('send %s > %s', domain, s)
    sock.write(s + CRLF)
  }

  sock.setEncoding('utf8')

  let data = '', step = 0, loginStep = 0, msg = ''
  const queue = [
    `MAIL FROM:<${from}>`,
    ...recipients.map((rcpt) => `RCPT TO:<${rcpt}>`),
    'DATA',
    'QUIT',
    '',
  ]
  const login = []

  let cmd
  let upgraded = false

  /*
    if(mail.user && mail.pass){
      queue.push('AUTH LOGIN');
      login.push(new Buffer(mail.user).toString("base64"));
      login.push(new Buffer(mail.pass).toString("base64"));
    }
    */

  let original
  try {
    await new Promise((r, j) => {
      const onData = (chunk) => {
        data += chunk
        const parts = data.split(CRLF)
        parts.forEach((line) => {
          logger.debug('recv %s > %s', domain, line)

          msg += (line + CRLF)

          if (line[3] == ' ') {
            // 250-information dash is not complete.
            // 250 OK. space is complete.
            const code = parseInt(line.substr(0, 3), 10)
            response(code, msg)
            msg = ''
          }
        })
        data = parts[parts.length - 1]
      }
      sock.on('data', onData)

      sock.on('error', (err) => {
        logger.error('Fail to connect %s', domain)
        j(err)
      })

      /**
       * @param {number} code
       * @param {string} message
       */
      function response(code, message) {
        switch (code) {
        case 220:
          //   220   on server ready
          if (upgraded == 'in-progress') {
            sock.removeAllListeners('data')

            original = sock
            original.pause()

            sock = connect({
              socket: sock,
              host: sock['_host'],
              rejectUnauthorized,
            }, () => {
              sock.on('data', onData)

              sock.removeAllListeners('close')
              sock.removeAllListeners('end')
            })

            sock.on('error', (err) => {
              logger.error('Error on connectMx for: ', err)
            })

            original.resume()
            upgraded = true
            w(`EHLO ${host}`)
            break
          }

          if (/\besmtp\b/i.test(message) || autoEHLO) {
            // TODO:  determin AUTH type; auth login, auth crm-md5, auth plain
            cmd = 'EHLO'
          } else {
            upgraded = true
            cmd = 'HELO'
          }
          w(`${cmd} ${host}`)
          break
        case 221: // bye
          r(message)
          break
        case 235: // verify ok
        case 250: // operation OK
          if (!upgraded) {
            if(/\bSTARTTLS\b/i.test(message)){
              w('STARTTLS')
              upgraded = 'in-progress'
            } else {
              upgraded = true
            }
            break
          }
        // eslint-disable-next-line no-fallthrough
        case 251: // foward
          if (step == queue.length - 1) {
            logger.info('OK: %s %s', code, message)
            r(message)
          }
          w(queue[step])
          step++
          break

        case 354: // start input end with . (dot)
          w(body)
          w('')
          w('.')
          break

        case 334: // input login
          w(login[loginStep])
          loginStep++
          break

        default:
          if (code >= 400) {
            logger.warn('SMTP responds error code %s', code)
            j(new Error(`SMTP code: ${code} msg: ${message}`))
          }
        }
      }
    })
  } finally {
    sock.removeAllListeners('data')
    sock.end()
    if (original) original.end()
  }
}
