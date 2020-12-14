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
  app.get("/api/movie/allbyfilter", moviecontroller.findAllByFilter);
  app.get("/api/movie/details", moviecontroller.findOneById);
  app.post("/api/movie/updatemoviecrew", moviecontroller.addMovieCrew);
  app.post("/api/movie/addmoviecrew", moviecontroller.addMovieCrew);
  app.post("/api/movie/save",  [authJwt.verifyToken], moviecontroller.saveMovie);

  app.get("/api/movie/toptrending", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/alltrending", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/toprecent", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/allrecent", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/toprandom", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/allrandom", moviecontroller.findAll);

  app.post("/api/movie/addschedule",  [authJwt.verifyToken], moviecontroller.addScheduleMovie);
  app.post("/api/movie/addfriendstoschedule",  [authJwt.verifyToken], moviecontroller.addFriendsToScheduleMovie);
  app.get("/api/movie/listschedules", moviecontroller.listMovieSchedules);
  app.get("/api/movie/listscheduleswithme", moviecontroller.listMovieSchedulesWithMe);
  app.post("/api/movie/listschedulesbyme", moviecontroller.listMovieSchedulesByMe);
  app.post("/api/movie/updatescheduleswithme", moviecontroller.statusUpdateMovieSchedulesWithMe);
  app.post("/api/movie/reschedule",   moviecontroller.reScheduleMovie);
 

}