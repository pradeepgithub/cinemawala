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
  app.get("/api/user/listallmakers",  controller.findMakerAll);
  app.get("/api/user/profile", [authJwt.verifyToken], controller.showProfile);
  app.post("/api/user/updateprofile", [authJwt.verifyToken], controller.completeProfile);

  
  app.post("/api/user/sendinvite", controller.sendFriendInvite);
  //sending multiple invites
  app.post("/api/user/sendinvitearray", controller.sendFriendInviteArray);
  

  app.post("/api/user/acceptrejectinvite", controller.acceptRejectFriendsInvite);
  app.get("/api/user/showsentinvite",  controller.showFriendInviteSent);
  app.get("/api/user/showrecievedinvite",  controller.showFriendInviteRecieved);
  app.get("/api/user/showmyfriends",  controller.showFriends);
  app.post("/api/user/unfriend", controller.unFriends);


  app.post("/api/user/writetous",  [authJwt.verifyToken],  controller.writeToUs);
  app.get("/api/user/showallwritetous",  controller.showAllWriteToUsMessages);

  app.post("/api/user/reportproblem",  [authJwt.verifyToken], controller.reportAProblem);
  app.get("/api/user/showallreportproblems",  controller.showAllReportProblemsMessages);
  

  
};
