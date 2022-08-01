const { sequelize, DataTypes } = require('../config/db')

module.exports = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: 'category',
    timestamps: false,
  }
)
