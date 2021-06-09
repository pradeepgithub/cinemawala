const mongoose = require("mongoose");

const SupportWrite = mongoose.model(
  "SupportWrite",
  new mongoose.Schema
        ({
            user_id: String,
            subject:String,
            message: String,
            status: String,
            type:String,
            datemsg: String,

            replies:
            {
            replied_user_id: String,
            datereply:String,
            message: String,
           }
                     
        })
);

module.exports = SupportWrite;

