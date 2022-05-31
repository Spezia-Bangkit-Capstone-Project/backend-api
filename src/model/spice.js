const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const spice = dbConnection.define(
  "spice",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    latin_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    benefit: {
      type: DataTypes.TEXT,
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

module.exports = spice;
