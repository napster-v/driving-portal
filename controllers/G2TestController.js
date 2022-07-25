const User = require("../models/user");
const appointmentModel = require("../models/appointment");

module.exports = async (req, res) => {
  console.log(req.body);
  console.log("complete body", req.body);
  console.log("logging keys length", Object.keys(req.body).length);
  if (!Object.keys(req.body).includes("time")) {
    appointmentModel
      .find({ date: req.body.date, isTimeSlotAvailable: true })
      .sort({ time: 1 })
      .then((result) => {
        console.log(result);
        res.render("g2", { timeSlots: result, date: req.body.date });
      });
  } else {
    appointmentModel
      .findOneAndUpdate(
        {
          date: req.body.date,
          time: req.body.time,
        },
        { isTimeSlotAvailable: false },
        {
          returnDocument: "after",
        }
      )
      .then((result) => {
        User.findOneAndUpdate(
          { _id: req.session.user },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            licenseNo: req.body.licenseNo,
            appointment: result._id,
            carDetails: {
              // nested object
              make: req.body.make,
              model: req.body.model,
              year: req.body.year,
              plateNo: req.body.plateNo,
            },
          },
          {
            returnDocument: "after",
          }
        )
          .then((result) => {
            res.redirect("/g");
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
};
