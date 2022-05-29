const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const user = dbConnection.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.BIGINT,
    },
    updated_at: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = user;
