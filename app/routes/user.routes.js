const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const otpcontroller = require("../controllers/otp.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );
  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

  app.get("/api/user/otp", otpcontroller.sendOTP);  
  app.get("/api/user/verifyotp", otpcontroller.verifyOTP);
  app.post("/api/user/changepassword", [authJwt.verifyToken], controller.changepassword);
  
  app.post("/api/user/sendinvite", controller.sendFriendInvite);
  app.get("/api/user/showinvite",  controller.showFriendInvite);
  app.get("/api/user/showrecievedinvite",  controller.showRecievedInvite);
  app.get("/api/user/showmyfriends",  controller.showFriends);
  
  app.get("/api/user/listallusers",  controller.listAll);
  app.get("/api/user/profile", controller.showProfile);


  

 
};
