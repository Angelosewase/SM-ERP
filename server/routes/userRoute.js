const express = require("express");
const {
  SignUpAdmin,
  Login,
  isAuth,
  getLoggedInUser,
  Logout,
} = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/registerUser", SignUpAdmin);
UserRouter.post("/login", Login);
UserRouter.get("/isAuth", isAuth);
UserRouter.get("/", getLoggedInUser);
UserRouter.get("/logOut", Logout);

module.exports = UserRouter;
