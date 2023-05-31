require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const routes = require("./src/routes/routes");
require("./src/database/mongodb").apply();
const { multer } = require("./src/middleware/uploadFile");
const morgan = require("morgan");
require("./src/utils/logging");

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

// override send to store response body for morgan token to retrieve
const originalSend = app.response.send;
app.response.send = function sendOverride(body) {
  this.resBody = body;
  return originalSend.call(this, body);
};

// morgan for logging
app.use(
  morgan(
    "[:date[iso]] (:method :url -- :status) : :response-time ms --> request headers: :req-headers, request body: :req-body, response headers: :res-headers, response body: :res-body \n"
  )
);

// define routes
app.use("/", routes);

// running server
const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
