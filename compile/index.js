const { _email } = require('./email')

/**
 * Send e-mails by direct connection to recipient's SMTP server.
You will most probably want to use a relay SMTP server, as most cloud server providers (Azure, Alibaba) block port 25 for direct connections.
 * @param {!_email.Mail} mail The email object with information about the message.
 * @param {string} mail.from The FROM field, e.g., `Hello World <hello@world.com>`.
 * @param {string} mail.to The TO field, e.g., `Foo Bar <foo@bar.co>`.
 * @param {string|!Array<string>} [mail.cc] Carbon copy the message to these recipients.
 * @param {string} [mail.bcc] Blind carbon copy (without revealing) to these recipients.
 * @param {string} [mail.subject] The email subject.
 * @param {{ html: string, text: string }} data The data.
 * @param {!_email.Config} config Options for the program.
 * @param {!_email.Dkim} [config.dkim] DKIM configuration for signing emails.
 * @param {boolean} [config.silent=false] Disable printing to console. Default `false`.
 * @param {string} [config.smtpHost] SMTP host to connect to (e.g., an email relay service).
 * @param {string} [config.smtpPort] The port to connect to SMTP server.
 * @param {string} [config.user] The username to use for login.
 * @param {string} [config.pass] The password for login.
 * @return {Promise}
 */
function email(mail, data, config) {
  return _email(mail, data, config)
}

module.exports = email

/* typal types/index.xml namespace */
/**
 * @typedef {_email.Mail} Mail `＠record` The email object with information about the message.
 * @typedef {Object} _email.Mail `＠record` The email object with information about the message.
 * @prop {string} from The FROM field, e.g., `Hello World <hello@world.com>`.
 * @prop {string} to The TO field, e.g., `Foo Bar <foo@bar.co>`.
 * @prop {string|!Array<string>} [cc] Carbon copy the message to these recipients.
 * @prop {string} [bcc] Blind carbon copy (without revealing) to these recipients.
 * @prop {string} [subject] The email subject.
 * @typedef {_email.Config} Config `＠record` Options for the program.
 * @typedef {Object} _email.Config `＠record` Options for the program.
 * @prop {!_email.Dkim} [dkim] DKIM configuration for signing emails.
 * @prop {boolean} [silent=false] Disable printing to console. Default `false`.
 * @prop {string} [smtpHost] SMTP host to connect to (e.g., an email relay service).
 * @prop {string} [smtpPort] The port to connect to SMTP server.
 * @prop {string} [user] The username to use for login.
 * @prop {string} [pass] The password for login.
 * @typedef {_email.Dkim} Dkim `＠record` DKIM information for signing messages. If you use a relay, this will not be required.
 * @typedef {Object} _email.Dkim `＠record` DKIM information for signing messages. If you use a relay, this will not be required.
 * @prop {string} privateKey The private key.
 * @prop {string} [keySelector="dkim"] The selector. Default `dkim`.
 * @prop {string} [domain] The domain. This will be deducted from your email host from the `mail.to` field.
 */
