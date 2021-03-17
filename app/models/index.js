const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.usertoken= require("./usertoken.model");
db.role = require("./role.model");
db.otp = require("./otp.model");
db.movie = require("./movie.model");
db.friend = require("./friends.model");
db.scheduledmovie = require("./schedule.model");
db.myfev_movie = require("./myfev_movies.model");
db.vote_schedule = require("./vote_schedule.model");
db.supportwrite = require("./supportwrite.model");
db.watched_by=  require("./watched_by.model");
db.country=  require("./countries.model");
db.ROLES = ["user", "admin", "moderator", "maker"];


module.exports = db;