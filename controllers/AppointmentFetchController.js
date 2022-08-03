const appointmentModel = require("../models/appointment");
const { prototype } = require("express-session/session/cookie");

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
    //If single value of time selected then it comes as string and not in array, hence converting time attribute to array before saving to DB.
    if (typeof req.body.time === "string") {
      console.log("Time is not in array, initiating conversion");
      req.body.time = [req.body.time];
    }

    req.body.time.forEach((time) => {
      appointmentModel
        .create({
          date: req.body.date,
          time: time,
          isTimeSlotAvailable: true,
          appointmentType: req.body.appointmentType,
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
    const appointments = await appointmentModel.find({
      date: req.body.date,
      appointmentType: req.body.appointmentType,
    });
    console.log(appointments);
    appointments.map((appointment) => {
      slots.map((slot) => {
        if (appointment.time === slot.time) {
          slot.isAvailable = false;
        }
      });
    });
    console.log(slots);
    res.render("appointment", {
      timeSlots: slots,
      date: req.body.date,
      apptType: req.body.appointmentType.toUpperCase(),
    });
  }
};
