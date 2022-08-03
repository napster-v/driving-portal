const User = require("./models/user");

const getLicenseDetails = async function (req) {
  const user = await User.findOne({ _id: req.session.user }).populate(
    "appointment"
  );

  if (user.appointment === undefined || user.appointment === null) {
    return undefined;
  }

/*
  if (req.url === "/g" && user.testType === "G2") {
    user.appointment = undefined;
  }
*/

  return user;
};

module.exports = { getLicenseDetails };
