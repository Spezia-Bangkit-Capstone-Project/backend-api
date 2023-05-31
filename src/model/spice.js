const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spices = new Schema(
  {
    name: String,
    latin_name: String,
    image: String,
    description: String,
    benefit: String,
    created_at: Number,
    updated_at: Number,
  },
  {
    collection: "spices",
    versionKey: false,
  }
);

module.exports = mongoose.model("spices", spices);
