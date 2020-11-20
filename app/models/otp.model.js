const mongoose = require("mongoose");

const Otp = mongoose.model(
  "Otp",
  new mongoose.Schema({
    mobile_number: String,
    otp: String,
    otp_status:Number
  })
);

module.exports = Otp;