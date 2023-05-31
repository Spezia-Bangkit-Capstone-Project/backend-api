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
      email: email,
    });

    // if user found and password are equals
    if (user && bcryptjs.compareSync(password, user.password)) {
      // generate token
      const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY);

      return res.status(200).json({
        error: false,
        message: "Login successful",
        data: {
          userId: user.id,
          username: user.username,
          email: user.email,
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

    // check user
    const user = await User.findOne({
      email: email,
    });

    // if email has already in database
    if (user) {
      return res.status(400).json({
        error: true,
        message: "Email has been used!",
      });
    }

    // create user
    await User.create({
      username: username,
      email: email,
      password: bcryptjs.hashSync(password, salt),
      created_at: created_at,
      updated_at: updated_at,
    });

    // if user has already created
    return res.status(201).json({
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).end();
  }
};

module.exports = { register, login };
