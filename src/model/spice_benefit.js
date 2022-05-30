const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const spice_benefit = dbConnection.define(
  "spice_benefit",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    spice_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "spices",
        key: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    benefit: {
      type: DataTypes.STRING(100),
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

module.exports = spice_benefit;
