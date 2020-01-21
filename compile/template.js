const { _email } = require('./email')

/**
 * @methodType {_email.email}
 */
function email(config) {
  return _email(config)
}

module.exports = email

/* typal types/index.xml namespace */
