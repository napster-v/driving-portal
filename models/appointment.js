let mongoose=require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  isTimeSlotAvailable: Boolean,
});

const appointmentModel = mongoose.model("Appointment", appointmentSchema);
module.exports = appointmentModel;