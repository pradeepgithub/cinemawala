const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const moviecontroller = require("../controllers/movie.controller");

const reportscontroller = require("../controllers/reports.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//[authJwt.verifyToken],
  //Movies 
  app.post("/api/movie/save",  [authJwt.verifyToken], moviecontroller.saveMovie);
  
  app.get("/api/movie/all", moviecontroller.findAll);
  app.get("/api/movie/allbyfilter", moviecontroller.findAllByFilter);
  app.get("/api/movie/details", moviecontroller.findOneById);
  app.get("/api/movie/myprojectslist", moviecontroller.myProjectsList);
  //Movie Crew
  app.post("/api/movie/updatemoviecrew", moviecontroller.addMovieCrew);
  app.post("/api/movie/addmoviecrew", moviecontroller.addMovieCrew);
  app.get("/api/movie/listmoviecrew", moviecontroller.listMovieCrew);
  app.post("/api/movie/acceptmoviecrew", moviecontroller.acceptRejectCrew);

  //Movie Watch
  app.post("/api/movie/addmoviewatch", moviecontroller.addMovieWatch);
  app.get("/api/movie/listmoviewatchbyuser", moviecontroller.listMovieWatchByUser);
  

  //Movie Ratings
  app.post("/api/movie/addmovierating", moviecontroller.addMovieRating);
  app.get("/api/movie/listmovierating", moviecontroller.listMovieRating);
  app.get("/api/movie/listmovieratingbyuser", moviecontroller.listMovieRatingByUser);

  //Movie Listings
  app.get("/api/movie/toptrending", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/alltrending", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/toprecent", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/allrecent", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/toprandom", moviecontroller.listMoviesSpecial);
  app.get("/api/movie/allrandom", moviecontroller.findAll);

  //Schedules 
  app.post("/api/movie/addschedule",  [authJwt.verifyToken], moviecontroller.addScheduleMovie);
  app.post("/api/movie/addscreening", [authJwt.verifyToken], moviecontroller.addScreeningMovie);

  
  app.get("/api/movie/listschedules", moviecontroller.listMovieSchedules);
  app.get("/api/movie/listmoviescreening", moviecontroller.listMovieScreening);

  
  app.post("/api/movie/reschedule",    moviecontroller.reScheduleMovie);
  app.post("/api/movie/delschedule",   moviecontroller.delScheduleMovie);

  //Schedules with me by others
  app.get("/api/movie/listscheduleswithme", moviecontroller.listMovieSchedulesWithMe);
  app.post("/api/movie/listschedulesbyme", moviecontroller.listMovieSchedulesByMe);
  app.post("/api/movie/updatescheduleswithme", moviecontroller.statusUpdateMovieSchedulesWithMe);

  //Add Friends to Schedules
  app.post("/api/movie/addfriendstoschedule", moviecontroller.addFriendsToScheduleMovie);
  app.post("/api/movie/addfriendstoschedulearray", moviecontroller.addFriendsToScheduleMovieArray);
  app.post("/api/movie/delfriendsfromschedule",  moviecontroller.delFriendsFromScheduleMovie);
  app.post("/api/movie/listscheduledfriendsbymovie", moviecontroller.listScheduledFriendsByMovie);

  //Fevourite Movie
  app.post("/api/movie/addfevmovie",   moviecontroller.addMyFebMovie);
  app.post("/api/movie/listmyfevmovie", moviecontroller.listMyFevMovies);
  app.post("/api/movie/delmyfevmovie", moviecontroller.deleteMyFevMovies);

  //Vote for Schedules
  app.post("/api/movie/sendvoteforschedule",  moviecontroller.sendVoteForScheduleMovie);
  app.post("/api/movie/addvoteforschedule", moviecontroller.addVoteForScheduleMovie);
  app.post("/api/movie/listvoteformovieschedule", moviecontroller.listVoteForScheduleMovies);

  app.post("/api/movie/myagree",  moviecontroller.showAgree);
  app.post("/api/movie/myreports",  moviecontroller.showReports);

  app.post("/api/reports/showreportsusercountrywise",  reportscontroller.showReportsUserCountryWise);
  app.post("/api/reports/showreportsuserageywise",  reportscontroller.showReportsUserAgeWise);
  app.post("/api/reports/showreportsmoviewatchedbygenders",  reportscontroller.showReportsMovieWachedByGenders);
  
  

}