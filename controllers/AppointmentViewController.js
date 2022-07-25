module.exports = async (req, res) => {
  if (loggedIn) {
    res.render("appointment", { timeSlots: undefined, date: undefined });
  } else {
    res.redirect("/login");
  }
};
