const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const otpcontroller = require("../controllers/otp.controller");
const multer = require('multer');
const { exists } = require("../models/otp.model");
// const upload = multer({dest:'uploads/images'});
const path = require('path');
const DIR = 'public/uploads/images';
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
 
let upload = multer({storage: storage});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.post("/api/user/otp", otpcontroller.sendOTP);  
  app.post("/api/user/verifyotp", otpcontroller.verifyOTP);
  app.post("/api/user/changepassword", controller.changepassword);
  app.post("/api/user/sendpasswordlink", controller.sendPasswordLink);
 
  app.post("/api/user/pay", controller.Pay);
  app.post("/api/user/changeStatus", controller.changeStatus);
  app.get("/api/user/listallusers",  controller.listAll);
  app.get("/api/user/listallmakers",  controller.findMakerAll);
  app.post("/api/user/listallwatchers",  controller.findMakerAll);
  app.post("/api/user/profile", [authJwt.verifyToken], controller.showProfile);
  app.post("/api/user/updateprofile", [authJwt.verifyToken], controller.completeProfile);
  app.post("/api/user/updateprofilewithimage", upload.single('profile_image'), controller.completeProfile);
  app.post("/api/user/updatewatcherprofile", [authJwt.verifyToken], controller.completeWatcherProfile);
  app.post("/api/user/profiles", controller.showProfile);
  app.post("/api/user/sendinvite", controller.sendFriendInvite);
  //sending multiple invites
  app.post("/api/user/sendinvitearray", controller.sendFriendInviteArray);
  

  app.post("/api/user/acceptrejectinvite", [authJwt.verifyToken], controller.acceptRejectFriendsInvite);
  app.post("/api/user/showsentinvite",  controller.showFriendInviteSent);
  app.post("/api/user/showrecievedinvite",  controller.showFriendInviteRecieved);
  app.post("/api/user/showmyfriends",  controller.showFriends);
  app.post("/api/user/unfriend", [authJwt.verifyToken], controller.unFriends);


  app.post("/api/user/writetous",  [authJwt.verifyToken],  controller.writeToUs);
  app.get("/api/user/showallwritetous",  controller.showAllWriteToUsMessages);
  app.post("/api/user/showallwritetousbyid",  controller.showAllWriteToUsMessagesById);

  app.post("/api/user/reportproblem",  [authJwt.verifyToken], controller.reportAProblem);
  app.get("/api/user/showallreportproblems",  controller.showAllReportProblemsMessages);
  
 // app.post("/api/user/uploadprofileimage",  controller.uploadProfileImage);

  app.post('/api/user/uploadprofileimage', upload.single('demo_image'), controller.uploadProfileImage);
  app.get('/api/user/listcountries', controller.listCountries);
  app.post('/api/user/getcountrycialcode', controller.getCountryDialCode);
  app.post('/api/user/getcountryname', controller.getCountryName);
  app.post('/api/user/isuserexists', controller.isUserExists);
  
};
