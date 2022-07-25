let mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const G2TestSchema = new Schema({});

G2TestSchema.pre("save", function (next) {
  bcrypt.hash(this.licenseNo, 10, (error, data) => {
    this.licenseNo = data;
    next();
  });
});

const G2TestModel = mongoose.model("G2Test", G2TestSchema);
module.exports = G2TestModel;