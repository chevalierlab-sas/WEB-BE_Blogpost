const express = require('express')
const router = express.Router()
const auth = require('../../controller/auth.controller')
const verify = require('../../middleware/verifyToken')

router.get('/user', verify, auth.user)
router.post('/register', auth.register)
router.post('/login', auth.login)

module.exports = router
