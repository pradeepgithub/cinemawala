const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;



let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail', 
  port: 2525,
  auth: {
     user: 'pradeep.verma@webhungers.com',
     pass: 'Pradeep.WH'
  }
});


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.makerBoard = (req, res) => {
    res.status(200).send("Cinemaker Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  



exports.showProfile = (req, res) => {
  User.findOne(req.params.username)
  .select('first_name last_name gender mobile_number country username email')
  .exec(function(err, doc){
    if(err || doc === null){
      res.status(404).json({error: 'PersonNotFound'});
    } else {
      res.json(doc);
    }
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


exports.changepassword = (req, res) => {
  User.findOne(req.params.username)
  .select('first_name last_name gender mobile_number country username email')
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