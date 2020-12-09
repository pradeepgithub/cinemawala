const mongoose = require("mongoose");

const Friends = mongoose.model(
  "Friends",
  new mongoose.Schema
        ({
                user_id: String,
                firend_id:String,
                mobile_number: String,
                email: String,
                status: String,
                
               
        })
);

module.exports = Friends;