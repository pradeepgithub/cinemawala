const config = require("../config/auth.config");
const { user } = require("../models");
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

   

      User.findOne(req.params.username)
      .exec(function(err, doc){
        if(err || doc === null){
         // res.status(404).json({error: 'PersonNotFound'});
        } else {
         //movie.added_by =  doc._id;
       
      
      
      console.log(doc._id);
      //  movie.added_by = doc.map(username => doc._id);
      }
    });

    const movie = new Movie({
      title: req.body.title,
      storyline: req.body.storyline,
      rating:req.body.rating,
      length: req.body.length,
      country:req.body.country,
      actors: req.body.actors,
      screened_festival:req.body.screened_festival,
      awards: req.body.awards,
      cost: req.body.cost,
      language:req.body.language,
      type:req.body.type,
      poster: req.body.poster,
      directors: req.body.directors,
      genres: req.body.genres,
      released: req.body.released,
      movie_url:req.body.movie_url,
      added_by:req.body.username

    });
      movie.save((err, movie) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: movie });
        });
  
  };