const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema
        ({
                title: String,
                // added_by: [
                //         {
                //           type: mongoose.Schema.Types.ObjectId,
                //           ref: "User"
                //         }
                //       ],
                added_by:String,
                released: String,
                length: String,
                storyline: String,
                language:String,
                country:String,
                actors: String,
                screened_festival: String,
                awards:String,
                cost: String,
                directors: String,
                genres: String,
                rating:String,
                poster: String,
                movie_url: String,
                type:String 
                 
               
        })
);

module.exports = Movie;