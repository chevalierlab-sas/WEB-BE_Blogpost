const { Sequelize, DataTypes } = require('@sequelize/core')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_ENGINE || 'mysql',
    logging: false,
  }
)

const connection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize
      .sync()
      .then(() => console.log('success'))
      .catch((error) => console.log('user', error))
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = { sequelize, connection, DataTypes }
