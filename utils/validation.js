const Validator = require('fastest-validator')
const v = new Validator()
const response = require('./responseHandler')

exports.validate = (res, data, schema, payload = {}) => {
  const check = v.compile(schema)
  const validationError = check(data)
  if (validationError.length) {
    response.error(res, {
      error: validationError,
      message: payload.message || 'data tidak valid',
    })
    return false
  }
  return true
}
