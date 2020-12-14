const mongoose = require("mongoose");
var Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
const Friends = mongoose.model(
  "Friends",
  new mongoose.Schema
        ({
                user_id:  String,
                friend_id: ObjectId,
                sender_mobile_number: String,
                rec_mobile_number: String,
                email: String,
                status: String, 
                
               
        })
);

module.exports = Friends;