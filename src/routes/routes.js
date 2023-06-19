const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controller/userController");
const SpiceController = require("../controller/spiceController");
require("../middleware/auth");

// welcome api
router.get("/", (req, res) => {
  return res.send(`Welcome to ${process.env.APP_NAME} Application`);
});

// authentication
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// dictionary of spice
router.get(
  "/spices",
  passport.authenticate("jwt", { session: false }),
  SpiceController.all
);

// scan image
// router.post(
//   "/spices/scan",
//   passport.authenticate("jwt", { session: false }),
//   SpiceController.scan
// );

// get spesific spices
router.get(
  "/spices/getByName",
  passport.authenticate("jwt", { session: false }),
  SpiceController.getByName
);

module.exports = router;
