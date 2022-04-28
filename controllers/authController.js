const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res, next) => {
  try {
    // TODO overeng
    const { password, passwordConfirmation } = req.body;
    if (password.length < 8) {
      res.status(400);
      req.flash("err", "Password must be at least 8 characters long");
      throw new Error("Password must be at least 8 characters long");
    } else if (password !== passwordConfirmation) {
      res.status(400);
      req.flash("err", "Passwords doesn't match");
      throw new Error("Passwords doesn't match");
    }

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    //  
    // TODO below
    req.flash(
      "success",
      "Your registration has been successfully completed, you can login"
    );
    res.redirect("/login");
  } catch (e) {
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash(
        "err",
        `Error on ${errors.array()[i].param}:${errors.array()[i].msg}`
      );
    }
    res.redirect("/signup");
  }
};
exports.logUserIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // session
            req.session.userId = user._id;
           
            res.status(200).redirect("/categories");
          } else {
            req.flash("err", "Your password isn't correct, try again");
            res.status(400).redirect("/login");
          }
        });
      } else {
        req.flash("err", "This user doesn't exist");
        res.status(400).redirect("/login");
      }
    });
  } catch (error) {}
};

exports.logUserOut = async (req, res) => {
  await req.session.destroy(() => {
    res.redirect("/");
  });
};
