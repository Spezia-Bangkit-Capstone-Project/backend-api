const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    created_at: Number,
    updated_at: Number,
  },
  {
    collection: "users",
    versionKey: false,
  }
);

module.exports = mongoose.model("users", users);
