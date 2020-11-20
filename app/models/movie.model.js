const mongoose = require("mongoose");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema
        ({
                title: String,
                description: String,
                rating:String,
                length: String,
                cost: String,
                language:String,
                type:String,
                poster: String,
                plot: String,
                fullplot: String,
                directors: String,
                genres: String,
                released: String
        })
);

module.exports = Movie;