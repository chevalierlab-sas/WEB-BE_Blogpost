const response = require('../utils/responseHandler')

module.exports = (callback) => async (req, res, next) => {
  try {
    await callback(req, res, next)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return response.error(res, {
        message: 'ada error',
        error: error.errors.map((e) => e.message),
      })
    }
    return response.error(res, {
      message: 'Terjadi error',
      error,
    })
  }
}
