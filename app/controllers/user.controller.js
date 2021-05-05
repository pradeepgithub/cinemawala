const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");
const Friends = require("../models/friends.model");
const { schema } = require("../models/friends.model");
const mongoose = require("mongoose");
const express = require("express");
const stripe = require('stripe')('sk_test_51IT3g2DmuthGm00hxbjGlbwadAU0FfazKe0CEThcmZU5Y0yxZXvixzUq5rFSQxiGpYxPTrUsCku4gYdlsTeHWXrG00SGmZREcg');

const User = db.user;
const Role = db.role;
const Friend = db.friend;
const SupportWrite = db.supportwrite;
const Country = db.country;


const multer = require('multer');
let transport = nodemailer.createTransport({
  //host: 'smtp.gmail.com',
  service: 'gmail', 
  //port: 2525,
  auth: {
     user: 'digitalvimarsh@gmail.com',
     pass: 'tposipxjhfwtbhgw'
  }
});

exports.showProfile = (req, res) => {
User.findOne({username: req.body.username}).then(data => {
  res.json(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Users."
  });
});

};


exports.isUserExists = (req, res) => {

  // User.findOne({username: req.body.username}).then(data => {
  //   //res.json(data);

  //   res.send({userexist: true});
   
  // })
  // .catch(err => {
  //   res.send({userexist: false});
  // });

  User.findOne({username: req.body.username}, function(err, user){
    if(err) {
      console.log(err);
    }
    var message;

    if(user) {
      
        message = true;
        
    } else {
        message= false;
       
    }
    res.json(message);
});

  
  };


exports.completeWatcherProfile = (req, res) => {

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
    fav_genre=req.body.fav_genre;
    profile_image=req.body.profile_image;
    User.updateOne({_id: user_id}, {$set: { profile_image:profile_image, first_name: first_name, last_name:last_name, country:country, email:email, 
      year_of_birth:year_of_birth, 
      mobile_number:mobile_number, gender:gender, street:street, city:city, state:state, pin:pin, country_name:country_name,
      fav_genre:fav_genre }}).then(data => {
      res.send(data);
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
  imdb_no=req.body.imdb_no;
  imdb_url=req.body.imdb_url;
  fav_genre=req.body.fav_genre;
  is_viewer_msg_blocked=req.body.is_viewer_msg_blocked;
  is_maker_msg_blocked=req.body.is_maker_msg_blocked;
  profile_image=req.body.profile_image;
  User.updateOne({_id: user_id}, {$set: { profile_image:profile_image, first_name: first_name, last_name:last_name, country:country, email:email, 
    year_of_birth:year_of_birth, 
    mobile_number:mobile_number, gender:gender, street:street, city:city, state:state, pin:pin, country_name:country_name,
    fav_genre:fav_genre, film_school_name:film_school_name, film_course_name:film_course_name, 
    film_school_year:film_school_year, film_school_country:film_school_country,
    imdb_no:imdb_no, imdb_url:imdb_url, is_viewer_msg_blocked:is_viewer_msg_blocked, is_maker_msg_blocked:is_maker_msg_blocked }}).then(data => {
     
    res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
 
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

  var usertype = req.body.usertype;
  var status = req.body.status;
  
  var is_maker=false;
  is_active = true;

  if(usertype == 'Watcher')
  {
    is_maker = false;
  }
  else
  {
    is_maker=true;
  }
if(status == 'pending')
{
  is_active = false;
}
else if(status == 'active')
{
  is_active = true;
}
else{
  is_active = true;
}
  User.find(
    { is_maker:is_maker, is_admin: false} )
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
  
  User.find({is_admin: false })
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
                      res.send({error: "Nothing updated"});
                      }else
                      {
                        res.send({message: "Password Updated"});
                      }
      
                      });
    }
});
 
};

exports.sendPasswordLink = (req, res) => {
     console.log(req.body.email);
  User.findOne({email: req.body.email}).exec(function(err, doc)
  {

      if(err || doc === null)
      {
        res.status(404).json({error: doc});
       
      } else {
  
      const message = {
            from: 'pradeep.invite@gmail.com', // Sender address
            to: 'pradeep.invite@gmail.com',  // recipients
            subject: 'Reset Password Link', // Subject line
            text: 'Link: http://localhost:3000/update-password'// Plain text body
        };
      transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log('mail has sent.');
              console.log(info);
            }
        });
          res.send({ message: 'Pasword reset link has been sent.' });
      }
  
     }
  );
};




exports.sendFriendInvite = (req, res) => {

  const fid= req.body.friend_id;
var idarrays = fid.split(','); 
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



exports.changeStatus = (req, res) => {

  const uid= req.body.id;
  const is_active_status= req.body.is_active;

  User.updateOne({_id: uid}, {$set: { is_active:is_active_status }}).then(data => {
    res.send(data);
    })
    .catch(err => {
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

exports.showAllWriteToUsMessagesById = (req, res) => {

  let msgid = req.body.message_id;
  var mongoObjectId = mongoose.Types.ObjectId(msgid);
  SupportWrite.aggregate([
  
   {$match: {"_id": mongoObjectId}},
   { "$project": {
    "user_id": { "$toObjectId": "$user_id"},message:1, subject:1, type:1 
    } 
    },
    { "$lookup": {
      "from": "users",
      "localField":  "user_id",
      "foreignField": "_id",
      "as": "users"
    }},
    {
      "$project":{
        subject:1,
        message:1,
        type:1,
        "users.first_name":1,
        "users.last_name":1,
        "users.mobile_number":1,
        "users.email":1,
        "users.country_name":1,
        "users.city":1,
        "users.state":1,
        "users.is_maker":1,
        "users._id":1,
         
      
  }
    }
    

  ])
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
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

  var profile_image ="";
  var message="";
  if (!req.file) {
      console.log("No file received");
      message = "Error! in image upload."
    } else {
     console.log('file received' + req.file.filename);
     profile_image = req.file.filename;
      message = "Successfully! uploaded";
    }
    res.send({ profile_image });

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

exports.Pay = async (request, response) => {
  try {
     // Create the PaymentIntent
    let intent = await stripe.paymentIntents.create({
      payment_method: request.body.payment_method_id,
      description: "Test payment",
      amount: request.body.amount * 100,
      currency: 'inr',
      confirmation_method: 'manual',
      confirm: true
    });
    // Send the response to the client
    response.send(generateResponse(intent));
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
};

const generateResponse = (intent) => {
  if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    };
  }
};