const User = require("./models/user");

const isUserLoggedIn = function (req) {
  return req.session.user && req.session.userType === "Driver";
};

const getLicenseDetails = async function (req) {
  return User.findOne({_id: req.session.user}).populate("appointment");
};

module.exports = { isUserLoggedIn, getLicenseDetails };
