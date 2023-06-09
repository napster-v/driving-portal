const User = require("../models/user");
module.exports = async (req, res) => {
  let args = {};
  switch (req.body.filter) {
    case "all":
      args = { testType: { $ne: null } };
      break;
    case "g":
      args = { testType: "G" };
      break;
    case "g2":
      args = { testType: "G2" };
      break;
  }
  User.find(args)
    .then((result) => {
      console.log(result);
      res.render("examiner", { data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
