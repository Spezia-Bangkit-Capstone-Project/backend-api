const { Sequelize } = require("sequelize");

// configure environment database connection
const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * create and drop database
 * for testing
 */
// dbConnection.sync({});
// dbConnection.sync({ force: true });

module.exports = dbConnection;
