const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controller/userController");
require("../middleware/auth");

// welcome api
router.get("/", (req, res) => {
  return res.send(`Welcome to ${process.env.APP_NAME} Application`);
});

// authentication
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// profil account
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile
);

module.exports = router;
