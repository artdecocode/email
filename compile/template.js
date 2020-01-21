const { _email } = require('./email')

/**
 * @methodType {_email.email}
 */
function email(mail, data, config) {
  return _email(mail, data, config)
}

module.exports = email

/* typal types/index.xml namespace */
