/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _email = {}
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
_email.Config.prototype.smtpHost
/**
 * The mail object.
 * @record
 */
_email.Mail
/**
 * The FROM field.
 * @type {string}
 */
_email.Mail.prototype.from
/**
 * The TO field.
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
 * DKIM information
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
 * @type {string}
 */
_email.Dkim.prototype.domain
