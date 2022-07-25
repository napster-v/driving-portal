const appointmentModel = require("../models/appointment");

module.exports = async (req, res) => {
  const date = req.body.date;
  const find = await appointmentModel.find({ date: req.body.date });
  console.log(find);
  for (const appointment of find) {
    for (const time of timeList) {
      if (appointment.time === time.time) {
        time.isAvailable = false;
      }
    }
  }
  res.redirect("/appointment");
};
