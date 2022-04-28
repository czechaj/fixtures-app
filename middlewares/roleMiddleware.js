const User = require("../models/User");

module.exports = (roles) => {
  return async (req, res, next) => {
    const user = await User.findOne({_id: req.session.userId });
    const userRole = user.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      return res.send("you are not authorized for this action");
    }
  };
};
