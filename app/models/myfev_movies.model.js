const mongoose = require("mongoose");

const MyFev_Movie = mongoose.model(
  "MyFev_Movies",
  new mongoose.Schema
        ({
                title: String,
                user_id:  String,
                movie_id: String
        }));


        module.exports = MyFev_Movie;