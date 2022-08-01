const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const response = require('./utils/responseHandler')

const app = express()

require('./config/db').connection()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// route version
app.use('/v1', require('./routes/v1'))

app.use((req, res) =>
  response.error(res, { code: 404, message: 'request not found' })
)

module.exports = app
