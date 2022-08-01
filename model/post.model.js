const { sequelize, DataTypes } = require('../config/db')

module.exports = sequelize.define(
  'post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    file_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'files',
        key: 'id',
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        type: 'FULLTEXT',
        name: 'text_idx',
        fields: ['body'],
      },
    ],
  }
)
