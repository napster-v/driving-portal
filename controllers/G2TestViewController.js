const { getLicenseDetails } = require("../helpers");
module.exports = async (req, res) => {
  if (userType === "Driver") {
    res.render("g2", {
      timeSlots: undefined,
      date: undefined,
      result: await getLicenseDetails(req),
    });
  } else {
    res.redirect("/login");
  }
};
