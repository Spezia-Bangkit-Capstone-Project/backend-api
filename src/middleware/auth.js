const User = require("../model/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

// verified bearer token
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({
      _id: jwt_payload._id,
    })
      .then((user) => {
        // verify user found and token is equals with database
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
