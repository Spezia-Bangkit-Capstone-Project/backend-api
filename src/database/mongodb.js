const mongoose = require("mongoose");

const connection = async () => {
  try {
    mongoose.set("strictQuery", false);
    // connect to mongodb
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_DB_NAME,
    });
    // console.log(connection);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connection;
