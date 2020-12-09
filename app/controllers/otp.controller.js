const config = require("../config/auth.config");
const nodemailer = require('nodemailer');

const db = require("../models");
const Otp = db.otp;  
const User = db.user;
const Role = db.role;



let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail', 
  port: 2525,
  auth: {
    user: 'pradeep.invite@gmail.com.com',
    pass: '@dwitiya123'
  }
});


exports.sendOTP = (req, res) => {

  var valotp = Math.floor(1000 + Math.random() * 9000);
  const otps = new Otp({
   mobile_number: req.body.mobile_number,
   otp:valotp,
   otp_status:1
   
  });

  Otp.findOne(req.param.mobile_number)
    // .select(mobile_number)
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
  
       var userToUpdate = req.body.mobile_number;
         Otp.updateOne({ mobile_number: userToUpdate }, {$set: {otp: valotp} }, function (err, result) {
          // res.send((err === null) ? {message: result } : {msg: err} );
          const message = {
            from: 'pradeep.verma@webhungers.com', // Sender address
            to: 'pradeep.invite@gmail.com',         // recipients
            subject: 'OTP', // Subject line
            text: 'OTP:'+valotp // Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log('mail has sent.');
              console.log(info);
            }
        });

          res.send({ message: valotp });
    });
          

  
     }
   });
   
   
   };

exports.verifyOTP = (req, res) => {
  Otp.findOne(req.param.otp)
    .exec(function(err, doc){
      if(err || doc === null){
        res.status(404).json({error: err}); 
      } else {
  
       var otpToUpdate = req.body.otp;
       var mobToUpdate = req.body.mobile_number;

         Otp.updateOne({ mobile_number: mobToUpdate, otp: otpToUpdate }, {$set: {otp_status: 2} }, function (err, result) {
if(err || result === null)
{
  res.send("Nothing updated");
}else
{
 User.updateOne({ mobile_number: mobToUpdate}, {$set: { mob_verified: "1"} }, 
 function (err, result) {
    res.send((err === null) ? {message: result } : {msg: err});
   // res.send("Nothing 11updated" + err);
  });
}
       
});
}
}); 
};