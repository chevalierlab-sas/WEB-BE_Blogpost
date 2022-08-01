const { sequelize, DataTypes } = require('../config/db')

module.exports = sequelize.define(
  'post_category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    tableName: 'posts_category',
    timestamps: false,
  }
)
