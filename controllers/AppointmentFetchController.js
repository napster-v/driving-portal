const appointmentModel = require("../models/appointment");

module.exports = async (req, res) => {
  let slots = [
    { time: "09:00", isAvailable: true },
    { time: "09:30", isAvailable: true },
    { time: "10:00", isAvailable: true },
    { time: "10:30", isAvailable: true },
    { time: "11:00", isAvailable: true },
    { time: "11:30", isAvailable: true },
    { time: "12:00", isAvailable: true },
    { time: "12:30", isAvailable: true },
    { time: "13:00", isAvailable: true },
    { time: "13:30", isAvailable: true },
    { time: "14:00", isAvailable: true },
  ];

  console.log("complete body", req.body);
  console.log("logging keys length", Object.keys(req.body).length);
  if (Object.keys(req.body).includes("time")) {
    // let keys = Object.keys(req.body);
    // delete keys[0];
    req.body.time.forEach((time) => {
      appointmentModel
        .create({
          date: req.body.date,
          time: time,
          isTimeSlotAvailable: true,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    res.redirect("/appointment");
  } else {
    const appointments = await appointmentModel.find({ date: req.body.date });
    console.log(appointments);
    appointments.map((appointment) => {
      slots.map((slot) => {
        if (appointment.time === slot.time) {
          slot.isAvailable = false;
        }
      });
    });
    console.log(slots);
    res.render("appointment", { timeSlots: slots, date: req.body.date });
  }
};
