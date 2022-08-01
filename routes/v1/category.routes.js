const express = require('express')
const router = express.Router()
const category = require('../../controller/category.controller')

router.get('/', category.all)
router.get('/:name', category.detail)

module.exports = router
