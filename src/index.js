import { getHost, groupRecipients, getAddresses, getAddress } from './lib'
import compose from './composer'
import { sendToSMTP } from './client'


function dummy () {}

/**
 * @type {_email.email}
 */
async function $email(mail, { html, text }, options = {}) {
  const {
    silent = false,
    logger = silent ? {
      debug: dummy,
      info: dummy,
      warn: dummy,
      error: dummy,
    } : {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
    dkim: {
      privateKey,
      keySelector = 'dkim',
    } = /** @type {_email.Dkim} */ ({}),
    devPort = -1,
    devHost = 'localhost',
    smtpPort = 25,
    smtpHost = -1,
    rejectUnauthorized,
    autoEHLO,
    user, pass,
  } = options

  const recipients = []

  if (mail.to) recipients.push(...getAddresses(mail.to))
  if (mail.cc) recipients.push(...getAddresses(mail.cc))
  if (mail.bcc) recipients.push(...getAddresses(mail.bcc))

  const groups = groupRecipients(recipients)

  const from = getAddress(mail.from)
  const host = getHost(from)

  const body = compose(mail.from, mail.to, mail.subject, html, text, {
    domain: host,
    keySelector,
    privateKey,
  }, {
    host,
  })

  const results = {}
  for (let domain in groups) {
    const to = groups[domain]
    try {
      const res = await sendToSMTP(domain, host, from, to, body, {
        logger,
        rejectUnauthorized, autoEHLO,
        devHost, devPort, smtpHost, smtpPort,
        user, pass,
      })
      results[domain] = res
    } catch (err) {
      results[domain] = err
    }
  }
  return results
}
// * @param mail {object}
// *             subject
// *             type         default 'text/plain', 'text/html'
// *             charset      default 'utf-8'
// *             encoding     default 'base64'
// *             id           default timestamp+from
// *             headers      object
// *             content
// *             attachments
// *               [{
// *                 type
// *                 filename
// *                 content
// *               }].
// *
// * @param callback function(err, domain).
// *

export default $email

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..')} _email.email
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Dkim} _email.Dkim
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Mail} _email.Mail
 */