const mongoose = require("mongoose");

const VoteForScheduledMovie = mongoose.model(
  "VoteForScheduledMovie",
  new mongoose.Schema
        ({
            title: { type: String, required: true },
            scheduled_by:String,
            scheduled_vote:
                {
                friend_name: String,
                friend_id: String,
                status:Boolean
               }
                     
        })
);

module.exports = VoteForScheduledMovie;