const config = require("../config/auth.config");
const { user, role } = require("../models");
const db = require("../models");
const User = db.user;
const Movie = db.movie;
const ScheduledMovie = db.scheduledmovie;
const MyFev_Movie = db.myfev_movie;
const VoteForScheduledMovie = db.vote_schedule;
const WatchedBy = db.watched_by;
const path = require('path');

exports.findAll = (req, res) => {
    const movie_name = req.body.movie_name;
    var condition = movie_name ? { movie_name: { $regex: new RegExp(movie_name), $options: "i" } } : {};
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

exports.moviePreRoll = (req, res) =>{
  const country = req.body.country;
  const path = require("path")
  var root = path.dirname(__dirname);
  var absolutePath = path.join(root,"/uploads/Projectorisloading.mp4") 
  data =absolutePath;
  res.send(data);

}

exports.myProjectsList = (req, res) => {
  const added_by = req.body.added_by;

  Movie.find({added_by:added_by})
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
  Movie.findOne({_id: id})
  .then(data => {
     // res.send(data);
     res.json(data);
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

exports.updateMovie = (req, res) => {

  
Movie.update({_id: req.body.movieId}, {$set: 
  {  
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
}
})
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
//add movies crew
exports.addMovieCrew = (req, res) => {

  Movie.update({_id: req.body.id}, {"$push": {
    "crew":{
      "name":req.body.crew_name,
      "role":req.body.crew_role,
      "email":req.body.crew_email,
      "notes": req.body.crew_notes,
      "status": req.body.status,
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

exports.listMovieCrewRequests = (req, res) => {

  var title = req.body.title;
  Movie.find({ 

    $and: [  
      {crew: {$exists: true }},
      title ? { title: { $regex: new RegExp(title), $options: "i" } } : {},
      {crew : { $elemMatch : { status : 0} }}
] },
    {'title': 1, crew:1})
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

exports.acceptRejectCrew = (req, res) => {
 
  var id=req.body.movie_id;
  var crew_name =req.body.crew_name;
  var status=req.body.status;
  var email=req.body.crew_email;
  var role=req.body.crew_role;
  

  Movie.update({ _id: id},{$pull: {"crew":{name:crew_name}}})
   .then(data => {
   
    Movie.update({ _id: id},   {$push: {"crew":{name:crew_name, role:role, email:email, status:status}}})
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
  })
  .catch(err => {
    console.log("Rrrr");
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });

};

exports.listMovieCrew = (req, res) => {

  var title = req.body.title;
  Movie.find({ 
      
   
    $and: [ 
      
     {crew: {$exists: true }},
      title ? { title: { $regex: new RegExp(title), $options: "i" } } : {},

      
] },
    {'title': 1, crew:1})
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

//add movies Watch
exports.addMovieWatch = (req, res) => {

   const watchedBy = new WatchedBy({
    "title":req.body.title,
    "user_id":req.body.user_id,
    "date_watched":req.body.date_watched

  });
  watchedBy.save((err, movie) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: movie });
      });

};


exports.listMovieWatchByUser = (req, res) => {

  var id=req.body.user_id;

  WatchedBy.find({user_id:id}).then(data => {
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



//add movies Ratings
exports.addMovieRating = (req, res) => {

  Movie.update({_id: req.body.id}, {"$push": {
    "ratings":{
      "user_id":req.body.user_id,
      "rating":req.body.rating
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

exports.listMovieRating = (req, res) => {

  Movie.find({ratings: {$exists: true }},
    {'title': 1, ratings:1})
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

exports.listMovieRatingByUser = (req, res) => {
  var id=req.body.user_id;
  
  Movie.find({"ratings" : { "$elemMatch" : { "user_id" : id} }},
    {'title': 1, ratings:1})
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
      // console.log("Rrrr");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
  }
 

};

//scheduled movies

exports.addScheduleMovie = (req, res) => {

  const fids= req.body.friend_id;
  var id = fids.split(", ");
  
  
const schedule = new ScheduledMovie({
  title: req.body.title,
  scheduled_by:req.body.scheduled_by,
  scheduled_date: req.body.scheduled_date,
  scheduled_time: req.body.scheduled_time,
  type_of_view:"schedule",

});

schedule.save((err, schedule) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
 
  scheduled_id=schedule._id;
  User.find({_id: { $in: id }}).then(data => {

    data.forEach(doc => {
      if(doc._id !=="")
      {
          console.log(doc);
          ScheduledMovie.update({_id: scheduled_id}, {"$push": {
            "scheduled_with":{
              "friend_name":doc.first_name + ' ' + doc.last_name,
              "friend_id":doc._id,
              "email": doc.email,
              "status":0
          }
          }}, {multi: true})
          .then(data => {
         
          }).catch(err => {
            //res.status(500).send({ message: err.message || "Some error occurred while scheduling users." });
          });
        /////
    }});
    res.send(data);
}).catch(err => {
res.status(500).send({ message: err.message || "Some error occurred while scheduling users." });
});


  });
};

exports.addFriendsToScheduleMovie = (req, res) => {


  ScheduledMovie.update({_id: req.body.scheduled_id}, {"$push": {
    "scheduled_with":{
      "friend_name":req.body.friend_name,
      "friend_id":req.body.friend_id,
      "email":req.body.email,
      "status":0
  }
  }}, {multi: true})
  .then(data => {
    res.send(data);
  })
  .catch(err => {

    res.status(500).send({
      message:
        err.message || "Some error occurred while scheduling users."
    });
  });
};

exports.addFriendsToScheduleMovieArray = (req, res) => {

const fids= req.body.friend_id;
var id = fids.split(", ");
var uid=req.body.user_id;
var scheduled_id=req.body.scheduled_id;
//console.log(id);
  User.find({_id: { $in: id }}).then(data => {
   
        data.forEach(doc => {
          if(doc._id !=="")
          {
              //
              ScheduledMovie.update({_id: scheduled_id}, {"$push": {
                "scheduled_with":{
                  "friend_name":doc.first_name + ' ' + doc.last_name,
                  "friend_id":doc._id,
                  "status":0
              }
              }}, {multi: true})
              .then(data => {
              // res.send(data);
              }).catch(err => {
                //res.status(500).send({ message: err.message || "Some error occurred while scheduling users." });
              });
            /////
        }});
        res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while scheduling users." });
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
  
   res.status(500).send({
     message:
       err.message || "Some error occurred while retrieving Users."
   });
 });
 

  
};

exports.delMovie = (req, res) => {

  var movie_id = req.body.movie_id;
  
  Movie.deleteMany({_id: movie_id})
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


exports.listMovieSchedules = (req, res) => {

  
  ScheduledMovie.find()
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

exports.listMovieSchedulesByMe = (req, res) => {
 console.log(req.body.scheduled_by);
  ScheduledMovie.find({scheduled_by:req.body.scheduled_by})
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
exports.listScheduledFriendsByMovie = (req, res) => {
 
  const scheduled_by = req.body.scheduled_by;
  const title= req.body.title;
  const type_of_view= req.body.type_of_view;
  if(type_of_view === "")
  {
    type_of_view="Schedule";
  }
  ScheduledMovie.find(
    {
      $and:[
      {scheduled_by: scheduled_by},{title: title}, {type_of_view: type_of_view}
      ]

    }
  ).then(data => {
   
      res.send(data);
    })
    .catch(err => {
    
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
       res.send(data);
    })
    .catch(err => {
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


//screening

 exports.addScreeningMovie = (req, res) => {

  const fids= req.body.friend_id;
var id = fids.split(", ");



  const schedule = new ScheduledMovie({
    title: req.body.title,
    scheduled_by:req.body.scheduled_by,
    scheduled_date: req.body.scheduled_date,
    scheduled_time: req.body.scheduled_time,
    type_of_view:"Screening",
    
  });
  schedule.save((err, schedule) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
     
      scheduled_id=schedule._id;
      User.find({_id: { $in: id }}).then(data => {
   
        data.forEach(doc => {
          if(doc._id !=="")
          {
              //
              ScheduledMovie.update({_id: scheduled_id}, {"$push": {
                "scheduled_with":{
                  "friend_name":doc.first_name + ' ' + doc.last_name,
                  "friend_id":doc._id,
                  "status":0
              }
              }}, {multi: true})
              .then(data => {
              // res.send(data);
              }).catch(err => {
                //res.status(500).send({ message: err.message || "Some error occurred while scheduling users." });
              });
            /////
        }});
        res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Some error occurred while scheduling users." });
  });


      });
  
  };
  
  exports.listMovieScreening = (req, res) => {

  var type_of_view = req.body.type_of_view;
  var scheduled_by = req.body.scheduled_by;

    ScheduledMovie.find({type_of_view:type_of_view, scheduled_by:scheduled_by})
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




exports.showMakerCount= (req, res) => {
User.count({is_maker: true})
  .then(data => {
    res.json(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });


}
exports.showWatcherCount= (req, res) => {
  User.count({is_maker: false})
    .then(data => {
      res.json(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
    
  }
    
  exports.showMovieCount= (req, res) => {
    Movie.count()
      .then(data => {
        res.json(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Users."
          });
        });
      
    }
      
exports.showReports= (req, res) => {
  WatchedBy.aggregate([
    {$match: {"users.gender":{$ne: ""}}},
   { "$project": { "user_id": { "$toObjectId": "$user_id"},title:1 } },
    { "$lookup": {
      "from": "users",
      "localField":  "user_id",
      "foreignField": "_id",
      "as": "Watched_by"
    }},
    { "$project": { 
      title:1,
      "Watched_by.first_name":1,
      "Watched_by.gender":1
     } },

    {$group : {_id : {title:"$title", gender: "$Watched_by.gender"} , totalPerson: { $sum: 1 }}},
   
    {$project: {"_id":0, "title":"$_id.title",gender:{ $toString: "$_id.gender" } , count:"$totalPerson"  }},

  ])
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

