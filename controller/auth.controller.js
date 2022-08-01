const { User, Post, File, Category } = require('../model')
const response = require('../utils/responseHandler')
const handleError = require('../utils/handleError')
const { validate } = require('../utils/validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user = handleError(async (req, res) => {
  const { id } = req.user
  const data = await User.findByPk(id, {
    include: [
      {
        model: Post,
        attributes: {
          exclude: ['user_id', 'file_id'],
        },
        include: [
          File,
          {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
          },
        ],
      },
    ],
    attributes: {
      exclude: 'password',
    },
  })

  return response.success(res, {
    message: 'berhasil ambil data user dari database',
    data,
  })
})

exports.register = handleError(async (req, res) => {
  const isValid = validate(res, req.body, {
    name: 'string',
    username: 'string|min:3|max:50',
    email: 'email',
    password: 'string|min:3|max:50',
  })
  if (!isValid) return

  req.body.password = await bcrypt.hash(req.body.password, bcrypt.genSaltSync())
  let data = await User.create(req.body)
  data = data.toJSON()
  delete data.password

  return response.success(res, {
    message: 'berhasil register user',
    data,
  })
})

exports.login = handleError(async (req, res) => {
  const isValid = validate(res, req.body, {
    username: 'string',
    password: 'string',
  })
  if (!isValid) return

  const { username, password } = req.body
  let user = await User.findOne({
    where: {
      username,
    },
  })

  if (!user || (user && !bcrypt.compareSync(password, user.password))) {
    return response.error(res, {
      code: 401,
      message: 'username dan password salah',
    })
  }

  user = user.toJSON()
  delete user.password
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1d' })

  return response.success(res, {
    message: 'Berhasil login',
    data: {
      user,
      token: `Bearer ${token}`,
    },
  })
})
