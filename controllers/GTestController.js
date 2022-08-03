const User = require("../models/user");
const appointmentModel = require("../models/appointment");
const { getLicenseDetails } = require("../helpers");

module.exports = async (req, res) => {
  console.log(req.body);
  console.log("complete body", req.body);
  console.log("logging keys length", Object.keys(req.body).length);
  const user = await getLicenseDetails(req);
  if (!Object.keys(req.body).includes("time")) {
    appointmentModel
      .find({
        date: req.body.date,
        isTimeSlotAvailable: true,
        appointmentType: req.body.appointmentType.toUpperCase(),
      })
      .sort({ time: 1 })
      .then((result) => {
        console.log(result);
          res.render("g", {
              timeSlots: result,
              date: req.body.date,
              result: user,
          });
      });
  } else {
      appointmentModel
          .findOneAndUpdate(
              {
                  date: req.body.date,
                  time: req.body.time,
                  appointmentType: req.body.appointmentType.toUpperCase(),
              },
              {isTimeSlotAvailable: false },
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
            testType: result.appointmentType,
            isPassed: null,
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
