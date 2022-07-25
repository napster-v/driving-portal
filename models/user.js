const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  licenseNo: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  appointment: { type: Schema.Types.ObjectId, ref: "Appointment" },
  carDetails: {
    make: String,
    model: String,
    year: Number,
    plateNo: String,
  },
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (error, data) => {
    this.password = data;
    next();
  });
});

UserSchema.pre("save", function (next) {
  if (!this.licenseNo === "") {
    bcrypt.hash(this.licenseNo, 10, (error, data) => {
      this.licenseNo = data;
      next();
    });
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
