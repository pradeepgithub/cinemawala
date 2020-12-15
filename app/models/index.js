const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.otp = require("./otp.model");
db.movie = require("./movie.model");
db.friend = require("./friends.model");
db.scheduledmovie = require("./schedule.model");
db.myfev_movie = require("./myfev_movies.model");
db.vote_schedule = require("./vote_schedule.model");


db.ROLES = ["user", "admin", "moderator", "maker"];

module.exports = db;