const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");
const Friends = require("../models/friends.model");
const { schema } = require("../models/friends.model");
const mongoose = require("mongoose");

const express = require("express");

const User = db.user;
const Role = db.role;
const Friend = db.friend;
const SupportWrite = db.supportwrite;
const Country = db.country;

const multer = require('multer');
// var Schema = mongoose.Schema;
//ObjectId = Schema.ObjectId;
// const uploadFile = require("../middlewares/upload");

let transport = nodemailer.createTransport({
  //host: 'smtp.gmail.com',
  service: 'gmail', 
  //port: 2525,
  auth: {
     user: 'pradeep.invite@gmail.com',
     pass: '@dwitiya123'
  }
});

exports.showProfile = (req, res) => {
//   User.findOne(req.params.username)
//   .select('username first_name last_name, email, country, mobile_number, gender, year_of_birth, pin')
//   .exec(function(err, doc){
//     if(err || doc === null){
//       res.status(404).json({error: 'PersonNotFound'});
//     } else {
//       // res.json(doc);
//       res.send(doc);
//     }
// });
 
User.findOne(req.params.username).then(data => {
  res.json(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Users."
  });
});

};


exports.completeProfile = (req, res) => {

    first_name= req.body.first_name;
    last_name=req.body.last_name;
    user_id=req.body.user_id;
    country= req.body.country;
    email= req.body.email;
    year_of_birth=req.body.year_of_birth;
    mobile_number= req.body.mobile_number;
    gender= req.body.gender;
    street= req.body.street;
    city= req.body.city;
    state= req.body.state;
    pin= req.body.pin;
    country_name = req.body.country_name;
    film_school_name=req.body.film_school_name;
    film_course_name=req.body.film_course_name;
    film_school_year=req.body.film_school_year;
    film_school_country=req.body.film_school_country;
    fav_genre=req.body.fav_genre;
    if(req.files)

    {
    profile_image=req.file.filename;
    console.log(profile_image);
    User.updateOne({_id: user_id}, {$set: { profile_image:profile_image, first_name: first_name, last_name:last_name, country:country, email:email, 
      year_of_birth:year_of_birth, 
      mobile_number:mobile_number, gender:gender, street:street, city:city, state:state, pin:pin, country_name:country_name,
      fav_genre:fav_genre, film_school_name:film_school_name, film_course_name:film_course_name, film_school_year:film_school_year, film_school_country:film_school_country }}).then(data => {
       
      res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
    }
    else{
      profile_image="";
      User.updateOne({_id: user_id}, {$set: { first_name: first_name, last_name:last_name, country:country, email:email, 
        year_of_birth:year_of_birth, 
        mobile_number:mobile_number, gender:gender, street:street, city:city, state:state, pin:pin, country_name:country_name,
        fav_genre:fav_genre, film_school_name:film_school_name, film_course_name:film_course_name, film_school_year:film_school_year, film_school_country:film_school_country }}).then(data => {
         
        res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Users."
          });
        });
    }
   
    
  


  
};



exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name ? { first_name: { $regex: new RegExp(first_name), $options: "i" } } : {};

  User.find(condition)
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



exports.findMakerAll = (req, res) => {

  var usertype = req.query.usertype;
  var status = req.query.status;
  
  var is_maker=false;
  is_active = true;

  if(usertype == 'Watcher')
  {
    is_maker = false;
    console.log("Not Maker");
  }
  else
  {
    is_maker=true;
    console.log("Maker");
  }
if(status == 'pending')
{
  is_active = false;
}
else{
  is_active = true;
}
  User.find(
    { is_maker:is_maker, is_active: is_active } )
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


exports.listAll = (req, res) => {
  
  User.find()
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

exports.changepassword = (req, res) => {
  User.findOne(req.params.username)
  .select('username first_name last_name, email, country, mobile_number, gender, year_of_birth, pin')
  .exec(function(err, doc){
    if(err || doc === null){
      res.status(404).json({error: 'PersonNotFound'});
    } else {
     
      var userToUpdate = req.body.username;
      var passToUpdate = bcrypt.hashSync(req.body.password, 8)

        User.updateOne({ username: userToUpdate}, {$set: {password: passToUpdate} }, function (err, result) {
                      if(err || result === null)
                      {
                      res.send("Nothing updated");
                      }else
                      {
                        res.send("Password Updated");
                      }
      
                      });
    }
});
 
};


exports.sendFriendInvite = (req, res) => {

  const fid= req.body.friend_id;
var idarrays = fid.split(','); 
console.log(idarrays);
  User.findOne({_id:fid})
  
  .exec(function(err, doc){
    if(err || doc === null){
      res.status(404).json({error: 'PersonNotFound'});
    } else {
     

const invite = new Friend({
  user_id: req.body.user_id,
  friend_id: req.body.friend_id,
  username:doc.username,
  sender_mobile_number: req.body.sender_mobile_number,
  rec_mobile_number: doc.mobile_number,
  email: doc.email,
  status: req.body.status
  
});

const message = {
  from: 'pradeep.invite@gmail.com', // Sender address
  to: req.body.email,         // recipients
  subject: 'friend Invite', // Subject line
  text: "Message for Invite" // Plain text body
};

invite.save((err, invite) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: invite });
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log('mail has sent.');
        console.log(info);
      }
    });
    });
  }});
};

exports.showFriendInviteSent = (req, res) => {
  //Sent Invite by me
   const sender_mobile_number = req.body.sender_mobile_number;
Friend.aggregate(
    [
     {$match : {sender_mobile_number :  sender_mobile_number }},
     {$lookup: {from: "users", localField: "rec_mobile_number", foreignField: "mobile_number", as: "users"}},
    ]
  ).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
 
  };
  
  
exports.showFriendInviteRecieved = (req, res) => {
  //invite recieved by me
  const rec_mobile_number = req.body.rec_mobile_number;
Friend.aggregate(
    [
     {$match : {rec_mobile_number :  rec_mobile_number }},
     {$lookup: {from: "users", localField: "sender_mobile_number", foreignField: "mobile_number", as: "users"}},
    ]
  ).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
};

exports.unFriends = (req, res) => {

const uid= req.body.user_id;
const fid= req.body.friend_id;
var idarrays = fid.split(','); 

  Friend.remove({$and:[{$or:[{user_id: fid},{friend_id:fid}]},{$or:[{user_id: uid},{friend_id:uid}]}]}).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });



};



exports.showFriends = (req, res) => {
  
const user_id = req.body.user_id;
const mobile_number = req.body.mobile_number;
var arr = [];

Friend.find({
 
  $or: [{ friend_id: user_id }, { user_id: user_id }], status:1
  }, {}).then(data => {
    data.forEach(element => {
      if(element.friend_id !=="")
      {
        arr.push(element.friend_id);
      }
    });

    User.find({_id:{$in:arr}})
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: 'PersonNotFound'});
      } else {
        res.send(doc);
      }
    });
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Users."
  });
});

}


exports.acceptRejectFriendsInvite = (req, res) => {
 
  var status =req.body.status;
  var invite_id =req.body.friendsInvite_id;

 
  Friend.update({ _id: invite_id},{$set: {status: status}})
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



exports.writeToUs = (req, res) => {

  const uid= req.body.user_id;
  const subj= req.body.subject;
  const msg= req.body.message;



const supportwrite = new SupportWrite({
  user_id: uid,
  subject: subj,
  message: msg,
  status: "New",
  type:"Write to Us"
  
});

const message = {
  from: 'pradeep.invite@gmail.com', // Sender address
  to: 'pradeep.invite@gmail.com',         // recipients
  subject: subj, // Subject line
  text: msg // Plain text body
};

supportwrite.save((err, supportwrite) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: supportwrite });
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log('mail has sent.');
        console.log(info);
      }
    });

    });
};

exports.showAllWriteToUsMessages = (req, res) => {
  SupportWrite.find({$and:[{status:"New"},{type:{$ne:"Report a Problem"}}]})
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

//Report a Problem

exports.reportAProblem = (req, res) => {

  const uid= req.body.user_id;
  const subj= req.body.subject;
  const msg= req.body.message;



const supportwrite = new SupportWrite({
  user_id: uid,
  subject: subj,
  message: msg,
  status: "New",
  type:"Report a Problem"
  
});

const message = {
  from: 'pradeep.invite@gmail.com', // Sender address
  to: 'pradeep.invite@gmail.com',         // recipients
  subject: subj, // Subject line
  text: msg // Plain text body
};

supportwrite.save((err, supportwrite) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: supportwrite });
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log('mail has sent.');
        console.log(info);
      }
    });

    });
};

exports.showAllReportProblemsMessages = (req, res) => {
  SupportWrite.find({$and:[{status:"New"},{type:"Report a Problem"}]})
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

exports.uploadProfileImage = (req, res) =>{

//const upload = multer({dest:'uploads/'}).single("demo_image");

// upload(req, res, (err) => {
//   if(err) {
//     res.status(400).send("Something went wrong!");
//   }
//   res.send(req.file);
// });


  var email = req.body.email;
  var file = req.file.originalname;
  console.log(file + " " + email);
  if(req.file) {
      res.json(req.file);
      
  }
  else throw 'error';


}

exports.sendFriendInviteArray = (req, res) => {

const fids= req.body.friend_id;
var id = fids.split(", ");
var uid=req.body.user_id;
var smobilenumber=req.body.sender_mobile_number;

  User.find({_id: { $in: id }}).then(data => {
    data.forEach(doc => {
      if(doc._id !=="")
      {
        

                      const invite = new Friend({
                        user_id: uid,
                        friend_id: doc._id,
                        username:doc.username,
                        sender_mobile_number: smobilenumber,
                        rec_mobile_number: doc.mobile_number,
                        email: doc.email,
                        status: 0
                        
                      });

                      const message = {
                        from: 'pradeep.invite@gmail.com', // Sender address
                        to: doc.email,         // recipients
                        subject: 'friend Invite', // Subject line
                        text: "Message for Invite" // Plain text body
                      };

                      invite.save((err, invite) => {
                          if (err) {
                            res.status(500).send({ message: err });
                            return;
                          }
                         
                          transport.sendMail(message, function(err, info) {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log('mail has sent.');
                              console.log(info);
                            }
                          });
                          });

     }});
     res.status(200).send({ message: data });
    }) .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};


exports.listCountries = (req, res) => {
  // const first_name = req.query.first_name;
  // var condition = first_name ? { first_name: { $regex: new RegExp(first_name), $options: "i" } } : {};

  Country.find()
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

exports.getCountryDialCode = (req, res) => {
 const countryname = req.body.countryname;
 var condition = countryname ? { countryname: { $regex: new RegExp(countryname), $options: "i" } } : {};

  Country.find({countryname:countryname})
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

exports.getCountryName = (req, res) => {
  const dial_code = req.body.dial_code;
  var condition = dial_code ? { dial_code: { $regex: new RegExp(dial_code), $options: "i" } } : {};
 
   Country.find({dial_code:dial_code})
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
