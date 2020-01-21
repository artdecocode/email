const { _email } = require('./email')

/**
 * Send e-mails by direct connection to recepient's SMPT server.
 * @param {!_email.Config} config Options for the program.
 * @param {boolean} [config.shouldRun=true] A boolean option. Default `true`.
 * @param {string} [config.text] A text to return.
 * @return {Promise<string>}
 */
function email(config) {
  return _email(config)
}

module.exports = email

/* typal types/index.xml namespace */
/**
 * @typedef {_email.Config} Config `＠record` Options for the program.
 * @typedef {Object} _email.Config `＠record` Options for the program.
 * @prop {boolean} [shouldRun=true] A boolean option. Default `true`.
 * @prop {string} [text] A text to return.
 */
