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

  app.get("/api/user/profile", controller.showProfile);

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
//test
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
