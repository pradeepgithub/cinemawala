const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Movie = db.movie;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const movie_name = req.query.movie_name;
    var condition = movie_name ? { movie_name: { $regex: new RegExp(movie_name), $options: "i" } } : {};
  
    Movie.find(condition)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };

  exports.saveMovie = (req, res) => {

    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        rating:req.body.rating,
        length: req.body.length,
        cost: req.body.cost,
        language:req.body.language,
        type:req.body.type,
        poster: req.body.poster,
        plot: req.body.plot,
        fullplot: req.body.fullplot,
        directors: req.body.directors,
        genres: req.body.genres,
        released: req.body.released
      });
    
      movie.save((err, movie) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: movie });
        });
  
  };