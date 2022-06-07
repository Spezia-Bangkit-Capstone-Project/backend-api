require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const routes = require("./src/routes/routes");
const { multer } = require("./src/middleware/uploadFile");

app.disable("x-powered-by");

// get image data
app.use(multer.single("image"));

// use cors
app.use(cors());

// use passport
app.use(passport.initialize());

// parse requests of json
app.use(express.json());

// parse requests of body on form data
app.use(express.urlencoded({ extended: true }));

// define routes
app.use("/", routes);

// running server
const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
