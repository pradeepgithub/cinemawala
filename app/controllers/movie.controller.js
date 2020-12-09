const config = require("../config/auth.config");
const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Movie = db.movie;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const movie_name = req.query.movie_name;
    var condition = movie_name ? { movie_name: { $regex: new RegExp(movie_name), $options: "i" } } : {};
  //  Movie.createIndex( { actors: "text" } )
    Movie.find()
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


  // Retrieve all Tutorials from the database.
exports.findAllByFilter = (req, res) => {

  const title = req.body.title;// ? req.body.title : "";
  const length = req.body.duration;// ? req.body.duration : "";
  const type = req.body.categories;//? req.body.categories : "";
  const language = req.body.language;//? req.body.language : "";
  const country = req.body.country;//? req.body.country : "";
  const genres = req.body.genres;//? req.body.genres : "";
  const year_from = req.body.year_from; //? req.query.year_from : "";
  const year_to = req.body.year_to;//? req.body.year_to : "";
  const actors = req.body.actors;//? req.body.actors : "";
  const screened_festival = req.body.festival;//? req.body.festival: "";

  
  // var condition = [
  // title ? { title: { $regex: new RegExp(title), $options: "i" } } : {},
  // type ? { type: { $regex: new RegExp(type), $options: "i" } } : {},
  
  // language ? { language: { $regex: new RegExp(language), $options: "i" } } : {},
  // country ? { country: { $regex: new RegExp(country), $options: "i" } } : {},
  // genres ? { genres: { $regex: new RegExp(genres), $options: "i" } } : {},
  // length ? { length: { $regex: new RegExp(length), $options: "i" } } : {},
  // screened_festival ? { screened_festival: { $regex: new RegExp(screened_festival), $options: "i" } } : {},
  //   {
  //    $and: [ { released: { $gte: year_from } }, { released: { $lte: year_to } } ] 
  //   },
  //   {actors: actors}
   
  // ];


  Movie.find(
    {
     
     
     $and: 
    [ 
   

    {
      title: { $regex: new RegExp(title), $options: "i" }},
    type ? { type: { $regex: new RegExp(type), $options: "i" } } : {},
    language ? { language: { $regex: new RegExp(language), $options: "i" } } : {},
  country ? { country: { $regex: new RegExp(country), $options: "i" } } : {},
  genres ? { genres: { $regex: new RegExp(genres), $options: "i" } } : {},
  length ? { length: { $regex: new RegExp(length), $options: "i" } } : {},
  screened_festival ? { screened_festival: { $regex: new RegExp(screened_festival), $options: "i" } } : {},
  year_to ? { released: year_to} : {},
  {actors: {$regex: new RegExp(actors), $options: "^$"}}
    
   ] 
  
  } )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("Rrrr");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findOneById = (req, res) => {

  const id = req.body.id;// ? req.body.title : "";
  Movie.find(
    {
      _id: id
    }
  ).then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("Rrrr");
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
      released: parseInt(req.body.released),
      movie_url:req.body.movie_url,
      added_by:req.body.username,
      crew:[{
        name:req.body.crew_name,
        role:req.body.crew_role,
        email:req.body.crew_email
    }]

    });
      movie.save((err, movie) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: movie });
        });
  
  };


//   exports.updateMovieCrew = (req, res) => {

//   Movie.updateMany({_id: req.body.id}, {"$set": {
//     "crew":[{
//       "name":req.body.crew_name,
//       "role":req.body.crew_role,
//       "email":req.body.crew_email,
//       "notes": req.body.crew_notes,
//   }]
//   }}, {multi: true})
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     console.log("Rrrr");
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving Users."
//     });
//   });
// };

exports.addMovieCrew = (req, res) => {

  Movie.update({_id: req.body.id}, {"$push": {
    "crew":{
      "name":req.body.crew_name,
      "role":req.body.crew_role,
      "email":req.body.crew_email,
      "notes": req.body.crew_notes,
  }
  }}, {multi: true})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Rrrr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
};