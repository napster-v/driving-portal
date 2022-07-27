module.exports = async (req, res) => {
  if (userType === "Driver") {
    res.render("g2", { timeSlots: undefined, date: undefined });
  } else {
    res.redirect("/login");
  }
};
