const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    country: String,
    country_name:String,
    mobile_number:String,
    gender:String,
    year_of_birth:String,
    mob_verified:String,
    pin: String,
    street:String,
    city:String,
    state:String,
    fav_genre:String,
    is_maker:Boolean,
    profile_image:String,
    film_school_name:String,
    film_course_name:String,
    film_school_year:String,
    film_school_country:String,
    imdb_no:String,
    imdb_url:String,
    is_active:Boolean,
  }, opts)
);

module.exports = User;