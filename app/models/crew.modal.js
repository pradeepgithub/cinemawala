const mongoose = require("mongoose");

const Crew = mongoose.model(
  "Crew",
  new mongoose.Schema
        ({
                name: String,
                role: String,
                email: String,
               
               
        })
);

module.exports = Crew;