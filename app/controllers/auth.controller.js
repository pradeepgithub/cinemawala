const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const UserToken = db.usertoken;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    mobile_number: req.body.mobile_number,
    country: req.body.country,
    country_name: req.body.country_name,
    username: req.body.username,
    email: req.body.email,
    year_of_birth:req.body.year_of_birth,
    password: bcrypt.hashSync(req.body.password, 8),
    profile_image:'',
    is_maker:false,
    street:'',
    city: '',
    state: '',
    pin:'',
    fav_genre:'',
    film_school_name:'',
    film_course_name:'',
    film_school_year:'',
    film_school_country:'', 
    imdb_no:'',
    imdb_url:'',
    is_viewer_msg_blocked:0,
    is_maker_msg_blocked:0,
    is_active:false,
    accesspin:'',
    
  });


   
   

  user.save((err, user) => {
    console.log(user);
    if (err) {
      res.status(500).send({ message: err });
      return;
    } 
    res.status(200).send({ message: user });
  });
};

exports.changeAccessPin = (req, res) => {

  const username= req.body.username;
  const accesspin= req.body.accesspin;

  User.updateOne({username: username}, {$set: { accesspin:accesspin }}).then(data => {
    res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
   
  };



exports.signin = (req, res) => {
  User.findOne({ $or: [
    {username: req.body.username},
    {mobile_number: req.body.username}
]  }).then(user => {

  var passwordIsValid =false;
if(req.body.password == user.accesspin)
{
  passwordIsValid = true;
}
else{
     passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    }
  
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

  
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    
    UserToken.create({
      user_id: user._id,
      username: user.username,
      accessToken: token
    }, function (err, small) {
      if (err) return handleError(err);
      // saved!
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      is_admin: user.is_admin,
      is_maker: user.is_maker,
    });
    
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
  
  
  
 
      
    
};


exports.refresh = (req, res) => {

  UserToken.findOne({accessToken: req.body.token}).then(usertoken => {
   

    if(usertoken)
    {
    var token = jwt.sign({ id: usertoken.user_id }, config.secret, {
      expiresIn: 518400 // 6days
    });
    
    if(token)
    {
    UserToken.updateOne({user_id: usertoken.user_id}, {$set: {accessToken: token}}).then(data => {
      res.status(200).send({
        id: usertoken.user_id,
        username: usertoken.username,
        accessToken: token
      });
      })
      .catch(err => {
        res.status(500).send({
          message: "Some error occurred while refreshing token."
        });
      }); 
      
      
    }else{
      res.status(500).send({
        message: "Given Token is not valid."
      });
    }
  }
  else
  {
    res.status(500).send({
      message: "Given Token is not valid."
    });
    
  }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Users."
    });
  });
  
  
  
 
      
    
};


exports.resetpassword = (req, res) => {
  User.findOne({
    username: req.body.username
  })
   
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
