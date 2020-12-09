const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");
const Friends = require("../models/friends.model");

const User = db.user;
const Role = db.role;
const Friend = db.friend;



let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail', 
  port: 2525,
  auth: {
     user: 'pradeep.invite@gmail.com.com',
     pass: '@dwitiya123'
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
  .select('username first_name last_name, email, country, mobile_number, gender, year_of_birth, pin')
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


exports.listAll = (req, res) => {
  
  //var condition = first_name ? { first_name: { $regex: new RegExp(first_name), $options: "i" } } : {};

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

  const fid= req.body.firend_id;

  User.findOne({_id:fid})
  .select('username first_name last_name, email, country, mobile_number, gender, year_of_birth, pin')
  .exec(function(err, doc){
    if(err || doc === null){
      res.status(404).json({error: 'PersonNotFound'});
    } else {
     

const invite = new Friend({
  user_id: req.body.user_id,
  firend_id: req.body.firend_id,
  username:doc.username,
  mobile_number: doc.mobile_number,
  email: doc.email,
  status: req.body.status
  
});

const message = {
  from: 'pradeep.invite@gmail.com', // Sender address
  to: req.body.email,         // recipients
  subject: 'Friends Invite', // Subject line
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
    
   // res.send({ message: "Mail Sent" });
    


    });
  }});
};



exports.showFriendInvite = (req, res) => {
  
    // user_id: req.body.user_id,
    // mobile_number: req.body.mobile_number,
    const user_id = req.body.user_id;
    const mobile_number = req.body.mobile_number;
 
console.log(user_id);

    Friend.find({
  $or: [{ user_id: user_id }]
})
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
  
  
exports.showRecievedInvite = (req, res) => {
  
  // user_id: req.body.user_id,
  // mobile_number: req.body.mobile_number,
  const user_id = req.body.user_id;
  const mobile_number = req.body.mobile_number;

console.log(user_id);

  Friend.find({
$or: [{ firend_id: user_id }]
})
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



exports.showFriends1 = (req, res) => {
  
  // user_id: req.body.user_id,
  // mobile_number: req.body.mobile_number,
  const user_id = req.body.user_id;
  const mobile_number = req.body.mobile_number;

console.log(user_id);
  Friend.find({
$or: [{ user_id: user_id }, { firend_id: user_id }]
})
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




exports.showFriends = (req, res) => {
  
  const user_id = req.body.user_id;
  const mobile_number = req.body.mobile_number;

  
var arr = [];

Friend.find({
 
  $or: [{ user_id: user_id }]
  }, {}).then(data => {
    data.forEach(element => {
      console.log(element.firend_id);
      console.log(element.status);
      if(element.firend_id !=="")
      {
        arr.push(element.firend_id);
      }
      
     




    });

    User.find({_id:{$in:arr}})
    // .select('username first_name last_name, email, country, mobile_number, gender, year_of_birth, pin')
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: 'PersonNotFound'});
      } else {
console.log(doc);
res.send(doc);
      }
    });


 // res.send(data);

})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving Users."
  });
});


}