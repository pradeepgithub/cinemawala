const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dbConfig = require ("./app/config/db.config"); 

var corsOptions = {
  // origin: "http://localhost:3000"
  origin: "*"
};
app.use(express.static('public'));
app.use(cors(corsOptions));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// for parsing multipart/form-data


const db = require("./app/models");
const Role = db.role;

// .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
db.mongoose
//.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  .connect(`${dbConfig.DBUrl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });



  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }


  
 app.post('/pay', async (request, response) => {
  try {
    console.log("OK");
    // Create the PaymentIntent
    let intent = await stripe.paymentIntents.create({
      payment_method: request.body.payment_method_id,
      description: "Test payment",
      amount: request.body.amount * 100,
      currency: 'inr',
      confirmation_method: 'manual',
      confirm: true
    });
    // Send the response to the client
    response.send(generateResponse(intent));
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to movie users application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/movie.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});