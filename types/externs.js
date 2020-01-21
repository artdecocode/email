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
 * Carbon copy.
 * @type {string|undefined}
 */
_email.Mail.prototype.cc
/**
 * Blind carbon copy.
 * @type {string|undefined}
 */
_email.Mail.prototype.bcc
/**
 * Reply to.
 * @type {string|undefined}
 */
_email.Mail.prototype.replyTo
/**
 * Return to.
 * @type {string|undefined}
 */
_email.Mail.prototype.returnTo
/**
 * The email subject.
 * @type {string|undefined}
 */
_email.Mail.prototype.subject
/**
 * The type of the email, e.g., `text/html`. Default `text/plain`.
 * @type {string|undefined}
 */
_email.Mail.prototype.type
/**
 * The type of the email, e.g., `text/html`. Default `text/plain`.
 * @type {string|undefined}
 */
_email.Mail.prototype.type
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
 * The domain.
 * @type {string}
 */
_email.Dkim.prototype.domain
