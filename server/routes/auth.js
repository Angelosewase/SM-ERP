const {
  signUpAdmin,
  Login,
  Logout,
  OtpAccountVerification,
  ChangePassword,
} = require("../controllers/authController");

const router = require("express").Router();
router.post("/register", signUpAdmin);
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/verify/:userId", OtpAccountVerification);
router.post("/changePassword", ChangePassword)

module.exports = router;
