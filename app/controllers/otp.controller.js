const config = require("../config/auth.config");
const nodemailer = require('nodemailer');
const db = require("../models");
const Otp = db.otp;  
const User = db.user;
const Role = db.role;

const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken)

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




exports.sendOTP = (req, res) => {
  var valotp = Math.floor(1000 + Math.random() * 9000);
  var emailtoadd = req.body.email;

  const otps = new Otp({
   email: emailtoadd,
   otp:valotp,
   otp_status:1

  });
  
  Otp.findOne({email: emailtoadd})
    .exec(function(err, doc){
      if(err || doc === null)
      {
        
        res.status(404).json({error: doc});
        otps.save((err, otps) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
         
        });   

      } else {
  
       var userToUpdate = emailtoadd;
         Otp.updateOne({ email: userToUpdate }, {$set: {otp: valotp} }, function (err, result) {
          const message = {
            from: 'support@manythoughts.com', // Sender address
            to: userToUpdate,         // recipients
            subject: 'OTP', // Subject line
            text: 'Your CinemaWalla App OTP is '+valotp // Plain text body
        };
      // client.messages.create({
      //       body: 'Your OTP for account verification is this: '+valotp,
      //       from: '+12517665750',
      //       to: '+91'+'9926619949'
      //     })
      //     .then(message => console.log(message.sid))
      //     .catch(err => {
      //     res.status(500).send({
      //       message:
      //         err.message || "Some error occurred while retrieving Users."
      //     });
      //     });

        transport.sendMail(message, function(err, info) {
         
          if (err) {
              console.log(err)
            } 
        });
     res.send({ message: valotp });
    });
  
     }
   });
   
   
   };

exports.verifyOTP = (req, res) => {
  Otp.findOne({$and:[{otp: req.body.otp}, {otp_status:1}] })

    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: "Wrong OTP"}); 
      } else {
  
      
       var otpToUpdate = req.body.otp;
       //var mobToUpdate = req.body.mobile_number;
       var mobToUpdate ="na";
       var emailToUpdate = req.body.email;

         Otp.updateOne({ email: emailToUpdate, otp: otpToUpdate }, {$set: {otp_status: 2} }, function (err, result) {
          if(err || result === null)
          {
            res.status(404).json({error: "Wrong OTP"}); 
          }else
          {
          User.updateOne({ email: emailToUpdate}, {$set: { mob_verified: "1"} }, 
          function (err, result) {
             res.send((err === null) ? {message: "OTP Verified" } : {error: "Wrong OTP"});
          });
          }
       
        });
}
}); 
};