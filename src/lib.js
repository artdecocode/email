import { createConnection } from 'net'
import { resolveMx } from 'dns'
import makePromise from 'makepromise'

export function getHost(email) {
  const m = /[^@]+@([\w\d\-.]+)/.exec(email)
  return m && m[1]
}

/**
 * Groups by domain.
 * @param {!Array<string>} recipients
 * @return {Object<string, !Array<string>}
 */
export function groupRecipients(recipients) {
  const groups = recipients.reduce((acc, current) => {
    const host = getHost(current)
    acc[host] = acc[host] || []
    acc[host].push(current)
    return acc
  }, {})
  return groups
}

/**
 * Connect to domain by Mx record
 * @param {string} domain The domain to connect to.
 * @return {!Promise<!net.Socket>} Connected socket.
 */
export async function connectMx(domain, {
  devPort, smtpHost, smtpPort, logger, devHost,
}) {
  if (devPort == -1) { // not in development mode -> search the MX
    let data
    if (smtpHost) {
      data = [{ exchange: smtpHost }]
    } else {
      data = /** @type {!Array<!dns.MxRecord>} */ (await makePromise(resolveMx, domain))
      data.sort((a, b) => a.priority > b.priority)
      logger.debug('mx resolved: ', data)
    }
    if (!data || !data.length)
      throw new Error(`Cannot resolve Mx of <${domain}>`)

    // if (smtpHost != -1) data.push({ exchange: smtpHost })

    // eslint-disable-next-line no-inner-declarations
    async function tryConnect(i) {
      const host = data[i]
      if (!host)
        throw new Error('Cannot connect to any SMTP server')

      try {
        return await new Promise((r, j) => {
          try {
            const sock = createConnection(smtpPort, host.exchange, () => {
              logger.debug('MX connection created: ', host.exchange)
              r(sock)
            })
          } catch (err) {
            j(err)
          }
        })
      } catch (err) {
        return await tryConnect(++i)
      }
    }

    return await tryConnect(0)
  } // development mode -> connect to the specified devPort on devHost
  const sock = createConnection(devPort, devHost)

  return await new Promise((r, j) => {
    sock.on('error', (err) => {
      j(new Error('Error on connectMx (development) for "'+ devHost +':' + devPort + '": ' + err))
    })

    sock.on('connect', () =>  {
      logger.debug('MX (development) connection created: '+ devHost +':' + devPort)
      sock.removeAllListeners('error')
      r(sock)
    })
  })
}

/**
 * Returns normalised email address.
 * @param {string} address
 */
export function getAddress(address) {
  return address.replace(/^.+</, '').replace(/>\s*$/, '').trim()
}

/**
 * Get email addresses.
 * @param {string|!Array<string>} addresses
 */
export function getAddresses(addresses) {
  if (!Array.isArray(addresses)) {
    addresses = addresses.split(',')
  }
  const results = addresses.map(getAddress)
  return results
}


/**
 * @suppress {nonStandardJsDoc}
 * @typedef {import('dns').MxRecord} dns.MxRecord
 */
/**
 * @suppress {nonStandardJsDoc}
 * @typedef {import('net').Socket} net.Socket
 */