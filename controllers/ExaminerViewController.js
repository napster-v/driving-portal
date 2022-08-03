const User = require("../models/user");

module.exports = async (req, res) => {
  User.find({ testType: { $ne: null }, isPassed: { $in: [false, null] } })
    .then((result) => {
      console.log(result);
      res.render("examiner", { data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
