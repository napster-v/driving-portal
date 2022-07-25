const {getLicenseDetails } = require("../helpers");

module.exports = async (req, res) => {
  console.log(req.session);
  if (loggedIn) {
    res.render("g", {
      result: await getLicenseDetails(req),
    });
  } else {
    res.redirect("/login");
  }
};
