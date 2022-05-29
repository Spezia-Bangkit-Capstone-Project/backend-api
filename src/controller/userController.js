const bcryptjs = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const salt = bcryptjs.genSaltSync(10);

const login = async (req, res) => {
  try {
    // validation form data
    const rules = Joi.object({
      email: Joi.string().email().max(50).required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = rules.validate(req.body);

    // if form data is invalid
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    // find user data
    const user = await User.findOne({
      attributes: ["id", "username", "password"],
      where: {
        email: email,
      },
    });

    // if user found and password are equals
    if (user && bcryptjs.compareSync(password, user.password)) {
      // generate token
      const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);

      return res.status(200).json({
        error: false,
        message: "Login successful",
        loginResult: {
          userId: user.id,
          username: user.username,
          token: token,
        },
      });
    }

    /**
     * if user not found
     * or password is not equals
     */
    return res.status(400).json({
      error: true,
      message: "Email / Password doesn't match",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).end();
  }
};

const register = async (req, res) => {
  try {
    // validation form data
    const rules = Joi.object({
      username: Joi.string().max(50).required(),
      email: Joi.string().email().max(50).required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = rules.validate(req.body);

    // if form data is invalid
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    const { username, email, password } = req.body;
    const created_at = Date.now();
    const updated_at = created_at;

    // find or create user
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        username: username,
        password: bcryptjs.hashSync(password, salt),
        created_at: created_at,
        updated_at: updated_at,
      },
    });

    // if email has already in database
    if (!created) {
      return res.status(400).json({
        error: !created,
        message: "Email has been used!",
      });
    }

    // if user has already created
    return res.status(201).json({
      error: !created,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).end();
  }
};

const getProfile = async (req, res) => {
  try {
    // response user data
    return res.status(200).json({
      error: false,
      message: "Profile fetched successfully",
      profileResult: {
        userId: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).end();
  }
};

module.exports = { register, getProfile, login };
