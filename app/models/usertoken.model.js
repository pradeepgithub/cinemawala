const mongoose = require("mongoose");

const UserToken = mongoose.model(
  "UserToken",
  new mongoose.Schema
        ({
               username: String,
               user_id: String,
               accessToken: String,
               
        })
);

module.exports = UserToken;