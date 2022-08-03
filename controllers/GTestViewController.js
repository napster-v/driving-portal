const {getLicenseDetails } = require("../helpers");

module.exports = async (req, res) => {
  console.log(req.session);
  res.render("g", {
    timeSlots: undefined,
    date: undefined,
    result: await getLicenseDetails(req),
  });
};
