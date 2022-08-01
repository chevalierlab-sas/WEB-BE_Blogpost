const express = require('express')
const router = express.Router()
const post = require('../../controller/post.controller')
const handleImage = require('../../utils/handleImage')
const auth = require('../../middleware/verifyToken')

router.get('/', post.all)
router.get('/:slug', post.detail)
router.post('/create', auth, handleImage.single('image'), post.create)
router.post(
  '/image/update/:id',
  auth,
  handleImage.single('image'),
  post.updateImage
)
router.put('/update/:id', auth, post.update)
router.delete('/delete/:id', auth, post.delete)

module.exports = router
