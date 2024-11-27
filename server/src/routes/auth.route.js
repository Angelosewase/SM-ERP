const {
  signUpAdmin,
  Login,
  Logout,
  OtpAccountVerification,
  ChangePassword,
  isLoggedIn,
} = require("../controllers/authController");
const { isValidObjectId } = require('mongoose');
const {authenticate} = require("../middlewares/auth");

const router = require("express").Router();
router.post("/register", signUpAdmin);
router.post("/login", Login);
router.get("/logout", Logout);
router.post("/verify/:userId", (req, res, next) => {
  if (!isValidObjectId(req.params.userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }
  OtpAccountVerification(req, res, next);
});

router.post("/changePassword", ChangePassword)
router.get("/isLoggedIn", authenticate, isLoggedIn)

module.exports = router;
