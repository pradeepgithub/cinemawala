const mongoose = require("mongoose");

const ScheduledMovie = mongoose.model(
  "ScheduledMovie",
  new mongoose.Schema
        ({
            title: { type: String, required: true },
            scheduled_by:String,
            scheduled_date: Date,
            scheduled_time: String,
            
                scheduled_with:
                {
                friend_name: String,
                friend_id: String,
                status:Boolean
               }
                     
        })
);

module.exports = ScheduledMovie;