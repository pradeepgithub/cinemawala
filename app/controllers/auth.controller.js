const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;


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


exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    
    console.log("In this");
    //console.log(user);

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
 
  
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    
    
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
    
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
