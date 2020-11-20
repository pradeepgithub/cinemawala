const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const moviecontroller = require("../controllers/movie.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/movie/all", moviecontroller.findAll);

 app.post("/api/movie/save",  moviecontroller.saveMovie);
 //[authJwt.verifyToken],
}