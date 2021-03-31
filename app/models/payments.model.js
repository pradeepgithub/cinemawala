const mongoose = require("mongoose");
const opts = { toJSON: { virtuals: true } };
const Payments = mongoose.model(
  "Payments",
  new mongoose.Schema
        ({
            transaction_id: String,
            payment_by:String,
            movie_id: String,
            movie_title: String,
            amount: Number,  
           
               
        }, opts)
);

module.exports = Payments;