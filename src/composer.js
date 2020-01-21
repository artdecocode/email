import generate from './dkim'
import { randomBytes } from 'crypto'

/**
 * Creates a message id
 */
function generateMessageId(host = 'unknown.host') {
  return `<${randomBytes(24)
    .toString('hex')}_${Date.now()}@${host}>`
}
/**
 * Creates the boundary
 */
function generateBoundary() {
  return `----${randomBytes(16).toString('hex')}`
}
/**
 * Composes the message with headers.
 * @param {string} from
 * @param {string} to
 */
export default function compose(
  from,
  to,
  subject,
  html,
  text,
  dkim = {
    privateKey: null,
    keySelector: null,
    domain: null,
  },
  {
    headers: h = {
      'X-Service': '@artdeco/email',
    },
    host,
  } = {}
) {
  /**
   * Creates the default data boundary etc
   */
  let boundary = generateBoundary()
  let document = ''
  const spr = '\r\n'
  const alternative = !!html
  const headers = {
    'Subject': subject,
    'From': from,
    'To': to,
    'Date': new Date().toUTCString(),
    'MIME-Version': '1.0',
    'Message-ID': generateMessageId(host),
    ...(alternative ? { 'Content-Type': `multipart/alternative; boundary=${boundary}` } : {}),
    ...h,
  }
  for (const key in headers) {
    document += `${key}: ${headers[key]}${spr}`
  }
  let body = ''

  if (alternative) {
    const data = []
    if (html) {
      const HTML = [
        `Content-Type: text/html; charset=utf-8`,
        `Content-Transfer-Encoding: quoted-printable${spr}`,
        html,
      ]
      data.push(HTML.join(spr))
    }
    if (text) {
      const TEXT = [
        `Content-Type: text/plain; charset=utf-8${spr}`,
        text.replace(/\n/g, spr),
      ]
      data.push(TEXT.join(spr))
    }
    body += `--${boundary}${spr}`
    body += data.join(`${spr}--${boundary}${spr}`)
    body += `${spr}${spr}--${boundary}--`
  } else if (text) {
    body += text.replace(/\n/g, spr)
  }
  /**
   * Checks if it should DKIM Sign the emmail
   */
  if (dkim.domain && dkim.keySelector && dkim.privateKey) {
    /**
     * Signs the email
     */
    const signature = generate(
      document,
      dkim,
      body,
    )
    // = Appends the signature
    document += signature
  }
  // = Adds the body
  document += spr
  document += body

  return document
}