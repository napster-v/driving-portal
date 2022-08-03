const User = require("../models/user");
module.exports = async (req, res) => {
  User.find({ testType: { $ne: null } })
    .then((result) => {
      console.log(result);
      res.render("admin", { data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};