const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema
        ({
                title: String,
                added_by:String,
                released: Number,
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
                type:String,
                crew:
                {
                name: String,
                role: String,
                email: String,
                notes:String,
                status:Boolean
                 },
                
                ratings:
                {
                user_id: String,
                rating: Number,
                },
                 
               
        })
);

module.exports = Movie;