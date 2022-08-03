const User = require("../models/user");
module.exports = async (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("appointment")
    .then((result) => {
      res.render("candidate", { data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
