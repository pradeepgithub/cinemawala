const config = require("../config/auth.config");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const Friends = require("../models/friends.model");
const { schema } = require("../models/friends.model");
const mongoose = require("mongoose");
const { user, role } = require("../models");
const db = require("../models");
const User = db.user;
const Movie = db.movie;
const ScheduledMovie = db.scheduledmovie;
const MyFev_Movie = db.myfev_movie;
const VoteForScheduledMovie = db.vote_schedule;
const WatchedBy = db.watched_by;
const Friend = db.friend;
const SupportWrite = db.supportwrite;


exports.showReportsUserCountryWise= (req, res) => {
    //User report country wise
    var cc=[];

    for(var i=1;i<400;i++)
    {
      cc.push(i);
    }
        User.aggregate([
          { "$group": {
              "_id": {
                "country":"$country",
                "gender": "$gender"
              },
              "userCount": { "$sum": 1 }
          }},
        
          {$project: {"_id":0, "country":"$_id.country", "country_name":"$_id.country_name","gender":"$_id.gender", "count":"$userCount"  }},
          {
            $bucket:
            {
                groupBy : {$toInt: "$country" }, 
                boundaries:cc, 
                default:"other", 
                output : 
                    {
                      "Total" : {$sum : '$count'}, 
                      "Male" : {$sum : {$cond: [{$eq: ['$gender','Male']}, '$count', 0]}},
                      "Female" : {$sum : {$cond: [{$eq: ['$gender','Female']}, '$count', 0]}},
                      "ThirdGender" : {$sum : {$cond: [{$eq: ['$gender','third_gender']}, '$count', 0]}}
                      
                    }   
                        
            }
          
          }
  
         
         
      ])
      
      
        .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Users."
            });
          });
      }
  

exports.showReportsUserCountryCount= (req, res) => {
            User.aggregate([
              { "$group": {
                  "_id": {
                    "country_name":"$country_name",
                  },
                  "userCount": { "$sum": 1 }
              }},
   
              {$project: {"_id":0, "country_name":"$_id.country_name", "count":"$userCount"  }},
            
          ])
          
          
            .then(data => {
              //console.log("this ius called");
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while retrieving Users."
                });
              });

     
          }
      
exports.showReportsUserAgeWise= (req, res) => {
    //User report country wise
        User.aggregate([
  
          {
            $addFields: {
               convertedYearOfBirth: { $toInt: "$year_of_birth" },
               convertedNow: { $toInt: "2020" },
            }
         },
  
          { "$group": {
           "_id":{"age": { $subtract: [ "$convertedNow", "$convertedYearOfBirth"] }, "gender":"$gender"},
            "userCount": { "$sum": 1 }
          }},
       
        {$project: {"_id":0, "age":"$_id.age",gender:"$_id.gender", count:"$userCount"  }},
        { "$sort": { "count": -1 } },

        {
            $bucket:
            {
                groupBy : "$age", 
                boundaries:[0, 20, 30, 40, 50, 60, 70], 
                default:"other", 
                output : 
                    {
                        "Total" : {$sum : '$count'}, 
                        "Male" : {$sum : {$cond: { if: { $eq: [ "$gender", "Male" ] }, then: '$count', else: 0 }}},
                        "Female" : {$sum : {$cond: { if: { $eq: [ "$gender", "Female" ] }, then: '$count', else: 0 }}}, 
                        "ThirdGender" : {$sum : {$cond: { if: { $eq: [ "$gender", "third_gender" ] }, then: '$count', else: 0 }}} 
                    
                    }
                    }
            }
  
      ])
      
   
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
  
       
exports.showReportsMovieWachedByGenre = (req, res) => {

    //var user_id =  req.body.user_id
   
     WatchedBy.aggregate([
      //  { "$project": { "movie_id": { "$toObjectId": "$movie_id"},genres:1 } },
       { "$lookup": {
         "from": "movies",
         "localField":  "title",
         "foreignField": "title", 
         "as": "movies"
       }},
       { "$project": { 
         title:1,
         "movies.genres":1,
        } },
   
      {$group : {_id : {title:"$title", genres: "$movies.genres"} , totalPerson: { $sum: 1 }}},
      
 {$project: {"_id":0, 
    genres:
    {
        $reduce: {
           input:"$_id.genres",
           initialValue: "",
           in: { $concat : ["$$value", "$$this"] }
         }
     }
    , count:"$totalPerson"  }},

     ])
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

exports.showReportsMovieWachedByGenders = (req, res) => {

  //var user_id =  req.body.user_id
 
   WatchedBy.aggregate([
    { "$project": { "user_id": { "$toObjectId": "$user_id"}, genre:1 } },
     { "$lookup": {
       "from": "users",
       "localField":  "user_id",
       "foreignField": "_id",
       "as": "Watched_by"
     }},
     { "$project": { 
       title:1,
       "Watched_by.country":1,
       "Watched_by.first_name":1,
       "Watched_by.gender":1
      } },
 
 

  {$group : {_id : {country:"$Watched_by.country", gender: "$Watched_by.gender"} , totalPerson: { $sum: 1 }}},
  
  {
    $project: {"_id":0, 
  "country":
  {
    $reduce: {
       input:"$_id.country",
       initialValue: "",
       in: { $concat : ["$$value", "$$this"] }
     }
 },
 
  gender:
  {
      $reduce: {
         input:"$_id.gender",
         initialValue: "",
         in: { $concat : ["$$value", "$$this"] }
       }
   }
  , count:"$totalPerson"  }},

   { "$sort": { "count": -1 } },

      {
          $bucket:
          {
              groupBy : "$country", 
              boundaries:["41","42","44","91","92"], 
              default:"other", 
              output : 
                  {
                      "Total" : {$sum : '$count'}, 
                      "Male" : {$sum : {$cond: { if: { $eq: [ "$gender", "Male" ] }, then: '$count', else: 0 }}},
                      "Female" : {$sum : {$cond: { if: { $eq: [ "$gender", "Female" ] }, then: '$count', else: 0 }}},  
                      "ThirdGender" : {$sum : {$cond: [{$eq: ['$gender','third_gender']}, '$count', 0]}}
                    },
                     
                      
                      
                  }
          }

   ])
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


        
exports.showReportsMovieMostViewed = (req, res) => {

   WatchedBy.aggregate([
     { "$lookup": {
       "from": "movies",
       "localField":  "title",
       "foreignField": "title", 
       "as": "movies"
     }},
     { "$project": { 
       title:1,
      } },
 
    {$group : {_id : {title:"$title"} , totalPerson: { $sum: 1 }}},
    
  {$project: {"_id":0, 
  title:"$_id.title",
  count:"$totalPerson" }},

  {
    "$limit": 10
}

   ])
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