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
        
          {$project: {"_id":0, "country":"$_id.country","gender":"$_id.gender", "count":"$userCount"  }},
          // // { "$sort": { "count": -1 } },
          // {
          //   $bucket:
          //   {
          //       groupBy : {$toInt: "$country" }, 
          //       boundaries:cc, 
          //       default:"other", 
          //       output : 
          //           {
          //               "total" : {$sum : 1}, 
          //               "male" : {$sum : {$cond: { if: { $eq: [ "$gender", "Male" ] }, then: 1, else: 0 }}},
          //               "female" : {$sum : {$cond: { if: { $eq: [ "$gender", "Female" ] }, then: 1, else: 0 }}}  }
          //           }
          //   }
  
         
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
                boundaries:[0,20,30,40,50], 
                default:"other", 
                output : 
                    {
                        "total" : {$sum : 1}, 
                        "male" : {$sum : {$cond: { if: { $eq: [ "$gender", "male" ] }, then: 1, else: 0 }}},
                        "female" : {$sum : {$cond: { if: { $eq: [ "$gender", "female" ] }, then: 1, else: 0 }}}  }
                    }
            }
  
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
  
  
exports.showReportsMovieWachedByGenders = (req, res) => {

        //var user_id =  req.body.user_id
       
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
          
           
        {$project: {"_id":0, 
        "title":"$_id.title",
        gender:
        {
            $reduce: {
               input:"$_id.gender",
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
             console.log("Rrrr");
             res.status(500).send({
               message:
                 err.message || "Some error occurred while retrieving Users."
             });
           });
       
       
       }

       
exports.showReportsMovieWachedByGenre = (req, res) => {

    //var user_id =  req.body.user_id
   
     WatchedBy.aggregate([
       {$match: {"users.gender":{$ne: ""}}},
      { "$project": { "user_id": { "$toObjectId": "$user_id"},genre:1 } },
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
      
       
    {$project: {"_id":0, 
    "title":"$_id.title",
    gender:
    {
        $reduce: {
           input:"$_id.gender",
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
         console.log("Rrrr");
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving Users."
         });
       });
   
   
   }