const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    country: String,
    mobile_number:String,
    gender:String,
    year_of_birth:String,
    mob_verified:String,
    pin: String,
    street:String,
    city:String,
    state:String,
    fav_genre:String,
    is_maker:Boolean
   

  })
);

module.exports = User;

// roles: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Role"
//   }
// ],