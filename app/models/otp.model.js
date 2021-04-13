const mongoose = require("mongoose");

const Otp = mongoose.model(
  "Otp",
  new mongoose.Schema({
    email:String,
    mobile_number: String,
    otp: String,
    otp_status:Number
  })
);

module.exports = Otp;