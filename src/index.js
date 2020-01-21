import { c } from 'erte'

/**
 * Send e-mails by direct connection to recepient's SMPT server.
 * @param {!_email.Config} [config] Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} [config.text] A text to return.
 */
export default async function email(config = {}) {
  const {
    shouldRun = true,
    text = '',
  } = config
  if (!shouldRun) return
  console.log('@artdeco/email called with %s', c(text, 'yellow'))
  return text
}

/**
 * @typedef {import('..').Config} _email.Config
 */
