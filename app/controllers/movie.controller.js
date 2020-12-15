const config = require("../config/auth.config");
const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Movie = db.movie;
const ScheduledMovie = db.scheduledmovie;
const MyFev_Movie = db.myfev_movie;
const VoteForScheduledMovie = db.vote_schedule;

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

  Movie.find(
    { $and: [  {
      title: { $regex: new RegExp(title), $options: "i" }},
    type ? { type: { $regex: new RegExp(type), $options: "i" } } : {},
    language ? { language: { $regex: new RegExp(language), $options: "i" } } : {},
  country ? { country: { $regex: new RegExp(country), $options: "i" } } : {},
  genres ? { genres: { $regex: new RegExp(genres), $options: "i" } } : {},
  length ? { length: { $regex: new RegExp(length), $options: "i" } } : {},
  screened_festival ? { screened_festival: { $regex: new RegExp(screened_festival), $options: "i" } } : {},
  year_to ? { released: year_to} : {},
  {actors: {$regex: new RegExp(actors), $options: "^$"}}] 
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

//add movies
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

//list tranding etc
exports.listMoviesSpecial = (req, res) => {

  //Note: We need to calculate tranding movie
  const criteria = req.body.criteria;//? req.body.actors : "";
  var number_movies = req.body.number_movies;//? req.body.festival: "";
  if(number_movies == "")
  {
    number_movies=100;
  }

  if(criteria == "Recent")
  {
  Movie.find({}).sort({$natural:-1}).limit(number_movies)
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
  }
  else if(criteria == "Trending")
  {
    Movie.find({}).sort({$natural:1}).limit(number_movies)
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
  }
  else{
    Movie.aggregate([{ $sample: { size: number_movies } }])
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
  }
 

};

//scheduled movies

exports.addScheduleMovie = (req, res) => {
const schedule = new ScheduledMovie({
  title: req.body.title,
  scheduled_by:req.body.scheduled_by,
  scheduled_date: req.body.scheduled_date,
  scheduled_time: req.body.scheduled_time,
  scheduled_with:[{
    friend_name:req.body.friend_name,
    friend_id:req.body.friend_id,
    status:0
  }]

});
schedule.save((err, schedule) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: schedule });
    });

};

exports.addFriendsToScheduleMovie = (req, res) => {
  ScheduledMovie.update({_id: req.body.scheduled_id}, {"$push": {
    "scheduled_with":{
      "friend_name":req.body.friend_name,
      "friend_id":req.body.friend_id,
      "status":0
  }
  }}, {multi: true})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Rrrr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while scheduling users."
    });
  });
};

exports.delFriendsFromScheduleMovie = (req, res) => {

  ScheduledMovie.update({_id: req.body.scheduled_id}, { $pull: {
    scheduled_with: {
      "friend_id":req.body.friend_id
    }
  }}, {multi: true})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Rrrr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while scheduling users."
    });
  });
};

exports.reScheduleMovie = (req, res) => {

  var scheduled_date= req.body.scheduled_date;
  var scheduled_time= req.body.scheduled_time; 
  var movieschedule_id = req.body.movieschedule_id;
  
  ScheduledMovie.update({_id: movieschedule_id},{$set: {scheduled_date: scheduled_date, scheduled_time: scheduled_time}})
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

exports.delScheduleMovie = (req, res) => {

  var movieschedule_id = req.body.movieschedule_id;
  
  ScheduledMovie.deleteMany({_id: movieschedule_id})
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
exports.listMovieSchedules = (req, res) => {

  
  ScheduledMovie.find()
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

exports.listMovieSchedulesByMe = (req, res) => {
 console.log(req.body.scheduled_by);
  ScheduledMovie.find({scheduled_by:req.body.scheduled_by})
    .then(data => {
      console.log("dsfds");
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
exports.listScheduledFriendsByMovie = (req, res) => {
 
  const scheduled_by = req.body.scheduled_by;
  const title= req.body.title;
  ScheduledMovie.find(
    {
      $and:[
      {scheduled_by: scheduled_by},{title: title}
      ]

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
}

exports.listMovieSchedulesWithMe = (req, res) => {
 
  var id=req.body.friend_id;
  ScheduledMovie.find({ "scheduled_with" : { "$elemMatch" : { "friend_id" : id} }})
    .then(data => {
      console.log("dsfds");
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

exports.statusUpdateMovieSchedulesWithMe = (req, res) => {
 
  var id=req.body.friend_id;
  var status =req.body.status;
  var movieschedule_id =req.body.movieschedule_id;
  var fname=req.body.friend_name;
 
  ScheduledMovie.update({ _id: movieschedule_id},{$pull: {"scheduled_with":{friend_name:fname, friend_id:id}}})
   .then(data => {
   
            ScheduledMovie.update({ _id: movieschedule_id},   {$push: {"scheduled_with":{friend_name:fname, friend_id:id, status:status}}})
          .then(data => {
            console.log(id);
            res.send(data);
          })
          .catch(err => {
            console.log("Rrrr");
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Users."
            });
          });
  })
  .catch(err => {
    console.log("Rrrr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
  

};

//Vote for Schedule
exports.sendVoteForScheduleMovie = (req, res) => {
  const votesforchedulemovie = new VoteForScheduledMovie({
    title: req.body.title,
    scheduled_by:req.body.scheduled_by,
    scheduled_vote:[{
      friend_name:req.body.friend_name,
      friend_id:req.body.friend_id,
      status:0
    }]
});
votesforchedulemovie.save((err, schedule) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: schedule });
});
};

exports.addVoteForScheduleMovie = (req, res) => {
  VoteForScheduledMovie.update({_id: req.body.vote_scheduled_id}, {"$push": {
    "scheduled_vote":{
      "friend_name":req.body.friend_name,
      "friend_id":req.body.friend_id,
      "status":0
  }
  }}, {multi: true})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log("Rrrr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while scheduling users."
    });
  });
};




exports.listVoteForScheduleMovies = (req, res) => {
 
  VoteForScheduledMovie.find({$and:[{title: req.body.title},{scheduled_by: req.body.scheduled_by}]})
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
//Favourite Movies
  
exports.listMyFevMovies = (req, res) => {

  var user_id =  req.body.user_id
  MyFev_Movie.aggregate(
    [
     {$match : {user_id:user_id}},
     {$lookup: {from: "movies", localField: "title", foreignField: "title", as: "movie_info"}},
    ]
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

exports.deleteMyFevMovies = (req, res) => {

  var fev_id =  req.body.fev_id
  MyFev_Movie.deleteMany({_id: fev_id})
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

exports.addMyFebMovie = (req, res) => {

  const MyFevMovie = new MyFev_Movie({
    title: req.body.title,
                  user_id:  req.body.user_id,
                  movie_id: req.body.movie_id,
    
  });
  MyFevMovie.save((err, MyFevMovie) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: MyFevMovie });
      });
  
};

exports.showAgree = (req, res) => {
 
    const scheduled_by = req.body.scheduled_by;
    const title= req.body.title;
    ScheduledMovie.find(
      {
        $and:[
        {scheduled_by: scheduled_by},{title: title}
        ]

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
}
