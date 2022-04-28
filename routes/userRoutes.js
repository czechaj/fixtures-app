const express = require("express");
const { body } = require("express-validator");

const User = require("../models/User");
const authController = require("../controllers/authController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const router = express.Router();

router.route("/newUser").post(
  [
    body("name").not().isEmpty().withMessage("Please enter your name"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      }),
  ],
  authController.createUser
);
router.route("/login").post(authController.logUserIn);
router.route("/logout").get(authController.logUserOut);

module.exports = router;
