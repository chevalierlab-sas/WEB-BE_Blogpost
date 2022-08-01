exports.success = (res, payload = {}) => {
  const response = {
    code: 200,
    status: 'success',
    message: '',
  }

  if (payload.message) response.message = payload.message
  if (payload.data) response.data = payload.data

  if (payload.create) response.code = 201
  else if (payload.code) response.code = payload.code

  return res.status(response.code).json(response)
}

exports.error = (res, payload = {}) => {
  const response = {
    code: 400,
    status: 'error',
    message: '',
  }

  if (payload.code) response.code = payload.code
  if (payload.message) response.message = payload.message
  if (payload.error) response.error = payload.error

  return res.status(response.code).json(response)
}
