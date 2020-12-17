const mongoose = require("mongoose");
var Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
const WatchedBy = mongoose.model(
  "WatchedBy",
  new mongoose.Schema
        ({
                title: { type: String, required: true },
                user_id:  String,
                date_watched: Date 
               
        })
);

module.exports = WatchedBy;

