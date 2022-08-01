// Import all model
const User = require('./user.model')
const File = require('./file.model')
const Category = require('./category.model')
const Post = require('./post.model')
const PostCategory = require('./postCategory.model')

// Relations
Post.User = Post.belongsTo(User, { foreignKey: 'user_id' })
Post.File = Post.belongsTo(File, { foreignKey: 'file_id' })
Post.Category = Post.belongsToMany(Category, {
  through: PostCategory,
  foreignKey: 'post_id',
  as: 'categories',
})
Category.Post = Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: 'category_id',
  as: 'posts',
})
User.Post = User.hasMany(Post, { foreignKey: 'user_id' })

module.exports = { User, File, Category, Post, PostCategory }
