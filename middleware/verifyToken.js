const jwt = require('jsonwebtoken')
const response = require('../utils/responseHandler')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token)
    return response.error(res, {
      code: 401,
      message: 'Token tidak ada',
    })

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err)
      return response.error(res, {
        code: 403,
        message: 'Ditolak',
      })

    req.user = data
    next()
  })
}
