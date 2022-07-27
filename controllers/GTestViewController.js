const {getLicenseDetails } = require("../helpers");

module.exports = async (req, res) => {
  console.log(req.session);
  res.render("g", {
    result: await getLicenseDetails(req),
  });
};
