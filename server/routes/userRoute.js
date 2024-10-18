const express = require("express");
const {
  SignUpAdmin,
  Login,
  isAuth,
  getLoggedInUser,
  Logout,
  updateUser,
  uploadProfileImage,
} = require("../controllers/userController");
const { uploadSingle } = require("../middlewares/multer");
const UserRouter = express.Router();

UserRouter.post("/registerUser", SignUpAdmin);
UserRouter.post("/login", Login);
UserRouter.get("/isAuth", isAuth);
UserRouter.get("/", getLoggedInUser);
UserRouter.get("/logout", Logout);
UserRouter.put("/:id", updateUser);
UserRouter.post("/upload", uploadSingle, uploadProfileImage);

module.exports = UserRouter;
