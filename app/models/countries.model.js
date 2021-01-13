const mongoose = require("mongoose");

var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const Countries = mongoose.model(
  "Countries",
  new mongoose.Schema
        ({
               
                
                countryname: String,
                cc_code: String,
                dial_code: String,
               
                
               
        })
);


module.exports = Countries;