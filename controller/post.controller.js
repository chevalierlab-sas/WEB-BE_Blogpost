const { Post, User, File, Category, PostCategory } = require('../model')
const response = require('../utils/responseHandler')
const handleError = require('../utils/handleError')
const { validate } = require('../utils/validation')
const slugify = require('slugify')

exports.all = handleError(async (req, res) => {
  const data = await Post.findAll({
    attributes: {
      exclude: ['user_id', 'file_id'],
    },
    include: [
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
      {
        model: User,
        attributes: {
          exclude: 'password',
        },
      },
      File,
    ],
  })

  return response.success(res, {
    message: 'berhasil ambil data dari database',
    data,
  })
})

exports.detail = handleError(async (req, res) => {
  const data = await Post.findAll({
    where: { slug: req.params.slug },
    attributes: {
      exclude: ['user_id', 'file_id'],
    },
    include: [
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
      {
        model: User,
        attributes: {
          exclude: 'password',
        },
      },
      File,
    ],
  })

  return response.success(res, {
    message: 'berhasil ambil data dari database',
    data,
  })
})

exports.create = handleError(async (req, res) => {
  const user = req.user
  const image = req.file
  const { title, body, category } = req.body
  const isValid = validate(res, req.body, {
    title: 'string|min:3',
    category: 'string',
    body: 'string',
  })
  if (!isValid) return

  if (!image) {
    return response.error(res, {
      message: 'image harus ada',
    })
  }

  const listCategory = category.split(',')
  const categories = await Promise.all(
    listCategory.map(async (e) => {
      const category = await Category.findOrCreate({ where: { name: e } })
      return category[0]
    })
  )

  const user_id = user.id
  const slug = slugify(title)
  const post = await Post.create(
    {
      title,
      body,
      slug,
      user_id,
      file: {
        name: image.filename,
        path: process.env.BASE_URL + '/images/' + image.filename,
      },
    },
    {
      include: [File],
    }
  )

  categories.map(
    async (e) =>
      await PostCategory.create({ post_id: post.id, category_id: e.id })
  )

  return response.success(res, {
    message: 'berhasil tambah postingan',
    data: {
      categories,
      post,
    },
  })
})

exports.update = handleError(async (req, res) => {
  const user = req.user
  const id = req.params.id
  const { title, body, category } = req.body
  const isValid = validate(res, req.body, {
    title: 'string|min:3',
    category: 'string[]',
    body: 'string',
  })
  if (!isValid) return

  const categories = await Promise.all(
    category.map(async (e) => {
      const category = await Category.findOrCreate({ where: { name: e } })
      return category[0]
    })
  )

  const user_id = user.id
  const slug = slugify(title)
  await Post.update(
    {
      title,
      body,
      slug,
      user_id,
    },
    {
      where: {
        user_id: user.id,
        id,
      },
    }
  )

  await PostCategory.destroy({ where: { post_id: id } })
  categories.map(
    async (e) => await PostCategory.create({ post_id: id, category_id: e.id })
  )

  return response.success(res, {
    message: 'berhasil ubah postingan',
  })
})

exports.updateImage = handleError(async (req, res) => {
  const user = req.user
  const image = req.file
  const id = req.params.id

  if (!image) {
    return response.error(res, {
      message: 'image harus ada',
    })
  }

  const file = await File.create({
    name: image.filename,
    path: process.env.BASE_URL + '/images/' + image.filename,
  })

  await Post.update(
    {
      file_id: file.id,
    },
    {
      where: {
        user_id: user.id,
        id,
      },
    }
  )

  return response.success(res, {
    message: 'berhasil update image postingan',
  })
})

exports.delete = handleError(async (req, res) => {
  const user = req.user
  const id = req.params.id

  await Post.destroy({
    where: {
      user_id: user.id,
      id,
    },
  })

  await PostCategory.destroy({ where: { post_id: id } })

  return response.success(res, {
    message: 'berhasil hapus postingan',
  })
})
