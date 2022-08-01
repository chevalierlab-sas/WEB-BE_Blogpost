const { Post, User, File, Category } = require('../model')
const response = require('../utils/responseHandler')
const handleError = require('../utils/handleError')

exports.all = handleError(async (req, res) => {
  const data = await Category.findAll({
    include: {
      model: Post,
      as: 'posts',
      through: { attributes: [] },
      attributes: {
        exclude: ['user_id', 'file_id'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: 'password',
          },
        },
        File,
      ],
    },
  })

  return response.success(res, {
    message: 'berhasil ambil data dari database',
    data,
  })
})

exports.detail = handleError(async (req, res) => {
  const data = await Category.findOne({
    where: {
      name: req.params.name,
    },
    include: {
      model: Post,
      as: 'posts',
      through: { attributes: [] },
      attributes: {
        exclude: ['user_id', 'file_id'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: 'password',
          },
        },
        File,
      ],
    },
  })

  return response.success(res, {
    message: 'berhasil ambil data dari database',
    data,
  })
})
