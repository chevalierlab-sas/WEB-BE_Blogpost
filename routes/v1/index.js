const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    message: 'welcome to api v1',
    version: 1,
  })
})

router.use('/auth', require('./auth.routes'))
router.use('/post', require('./post.routes'))
router.use('/category', require('./category.routes'))

module.exports = router
