const mongoose = require("mongoose");

const SupportWrite = mongoose.model(
  "SupportWrite",
  new mongoose.Schema
        ({
            user_id: String,
            subject:String,
            message: String,
            status: String,
                     
        })
);

module.exports = SupportWrite;

