const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              req.session.user = user._id;
              req.session.userType = user.userType;
              userType = user.userType;
              res.redirect("/dashboard");
            } else {
              console.log("password incorrect");
              res.redirect("/login");
            }
          }
        );
      } else {
        res.redirect("/signup");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
