const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.otp = require("./otp.model");
db.movie = require("./movie.model");

db.ROLES = ["user", "admin", "moderator", "maker"];

module.exports = db;