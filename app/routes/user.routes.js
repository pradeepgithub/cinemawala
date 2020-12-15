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


  app.get("/api/user/otp", otpcontroller.sendOTP);  
  app.get("/api/user/verifyotp", otpcontroller.verifyOTP);
  app.post("/api/user/changepassword", [authJwt.verifyToken], controller.changepassword);
  
  app.get("/api/user/listallusers",  controller.listAll);
  app.get("/api/user/profile", controller.showProfile);
  app.post("/api/user/updateprofile", controller.completeProfile);

  
  app.post("/api/user/sendinvite", controller.sendFriendInvite);
  app.post("/api/user/acceptrejectinvite", controller.acceptRejectFriendsInvite);
  app.get("/api/user/showsentinvite",  controller.showFriendInviteSent);
  app.get("/api/user/showrecievedinvite",  controller.showFriendInviteRecieved);
  app.get("/api/user/showmyfriends",  controller.showFriends);



  

 
};
