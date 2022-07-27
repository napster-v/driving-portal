const User = require("../models/user");

module.exports = async (req, res) => {
  if (req.body.password === req.body.confirmPassword) {
    User.create({
      username: req.body.username,
      password: req.body.password,
      userType: req.body.userType,
      firstName: req.body.firstName ? req.body.firstName : " ",
      lastName: req.body.lastName ? req.body.lastName : " ",
      age: req.body.age ? req.body.age : 0,
      licenseNo: req.body.licenseNo ? req.body.licenseNo : " ",
      appointment: null,
      carDetails: {
        // nested object
        make: req.body.make ? req.body.make : " ",
        model: req.body.model ? req.body.model : " ",
        year: req.body.year ? req.body.year : 0,
        plateNo: req.body.plateNo ? req.body.plateNo : " ",
      },
    }).then((result) => {
      console.log(result);
      res.redirect("/login");
    });
  } else {
    res.redirect("/signup");
  }
};
