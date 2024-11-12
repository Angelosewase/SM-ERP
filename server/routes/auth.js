const {
  signUpAdmin,
  Login,
  Logout,
  OtpAccountVerification,
} = require("../controllers/authController");

const router = require("express").Router();
router.post("/register", signUpAdmin);
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/verify/:userId", OtpAccountVerification);

module.exports = router;
