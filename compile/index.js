const { _email } = require('./email')

/**
 * Send e-mails by direct connection to recipient's SMTP server.
 * @param {!_email.Mail} mail The mail object.
 * @param {string} mail.from The FROM field.
 * @param {string} mail.to The TO field.
 * @param {string} [mail.cc] Carbon copy.
 * @param {string} [mail.bcc] Blind carbon copy.
 * @param {string} [mail.replyTo] Reply to.
 * @param {string} [mail.returnTo] Return to.
 * @param {string} [mail.subject] The email subject.
 * @param {string} [mail.type="text/plain"] The type of the email, e.g., `text/html`. Default `text/plain`.
 * @param {string} [mail.type="text/plain"] The type of the email, e.g., `text/html`. Default `text/plain`.
 * @param {{ html: string, text: string }} data The data.
 * @param {!_email.Config} config Options for the program.
 * @param {!_email.Dkim} [config.dkim] DKIM configuration for signing emails.
 * @param {string} [config.smtpHost] SMTP host to connect to (e.g., an email relay service).
 * @param {string} [config.smtpHost] The port to connect to SMTP server.
 * @return {Promise}
 */
function email(mail, data, config) {
  return _email(mail, data, config)
}

module.exports = email

/* typal types/index.xml namespace */
/**
 * @typedef {_email.Config} Config `＠record` Options for the program.
 * @typedef {Object} _email.Config `＠record` Options for the program.
 * @prop {!_email.Dkim} [dkim] DKIM configuration for signing emails.
 * @prop {string} [smtpHost] SMTP host to connect to (e.g., an email relay service).
 * @prop {string} [smtpHost] The port to connect to SMTP server.
 * @typedef {_email.Mail} Mail `＠record` The mail object.
 * @typedef {Object} _email.Mail `＠record` The mail object.
 * @prop {string} from The FROM field.
 * @prop {string} to The TO field.
 * @prop {string} [cc] Carbon copy.
 * @prop {string} [bcc] Blind carbon copy.
 * @prop {string} [replyTo] Reply to.
 * @prop {string} [returnTo] Return to.
 * @prop {string} [subject] The email subject.
 * @prop {string} [type="text/plain"] The type of the email, e.g., `text/html`. Default `text/plain`.
 * @prop {string} [type="text/plain"] The type of the email, e.g., `text/html`. Default `text/plain`.
 * @typedef {_email.Dkim} Dkim `＠record` DKIM information
 * @typedef {Object} _email.Dkim `＠record` DKIM information
 * @prop {string} privateKey The private key.
 * @prop {string} [keySelector="dkim"] The selector. Default `dkim`.
 * @prop {string} domain The domain.
 */
