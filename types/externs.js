/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _email = {}
/**
 * The email object with information about the message.
 * @record
 */
_email.Mail
/**
 * The FROM field, e.g., `Hello World <hello@world.com>`.
 * @type {string}
 */
_email.Mail.prototype.from
/**
 * The TO field, e.g., `Foo Bar <foo@bar.co>`.
 * @type {string}
 */
_email.Mail.prototype.to
/**
 * Carbon copy the message to these recipients.
 * @type {(string|!Array<string>)|undefined}
 */
_email.Mail.prototype.cc
/**
 * Blind carbon copy (without revealing) to these recipients.
 * @type {string|undefined}
 */
_email.Mail.prototype.bcc
/**
 * The email subject.
 * @type {string|undefined}
 */
_email.Mail.prototype.subject
/**
 * Options for the program.
 * @record
 */
_email.Config
/**
 * DKIM configuration for signing emails.
 * @type {(!_email.Dkim)|undefined}
 */
_email.Config.prototype.dkim
/**
 * Disable printing to console. Default `false`.
 * @type {boolean|undefined}
 */
_email.Config.prototype.silent
/**
 * SMTP host to connect to (e.g., an email relay service).
 * @type {string|undefined}
 */
_email.Config.prototype.smtpHost
/**
 * The port to connect to SMTP server.
 * @type {string|undefined}
 */
_email.Config.prototype.smtpPort
/**
 * DKIM information for signing messages. If you use a relay, this will not be required.
 * @record
 */
_email.Dkim
/**
 * The private key.
 * @type {string}
 */
_email.Dkim.prototype.privateKey
/**
 * The selector. Default `dkim`.
 * @type {string|undefined}
 */
_email.Dkim.prototype.keySelector
/**
 * The domain. This will be deducted from your email host from the `mail.to` field.
 * @type {string|undefined}
 */
_email.Dkim.prototype.domain

/* typal types/api.xml externs */
/**
 * Send e-mails by direct connection to recipient's SMTP server.
You will most probably want to use a relay SMTP server, as most cloud server providers (Azure, Alibaba) block port 25 for direct connections.
 * @typedef {function(!_email.Mail,{ html: string, text: string },!_email.Config): !Promise}
 */
_email.email
