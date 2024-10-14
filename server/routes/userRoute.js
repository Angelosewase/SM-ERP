const express = require("express");
const {
  SignUpAdmin,
  Login,
  isAuth,
  getLoggedInUser,
  Logout,
  updateUser,
} = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/registerUser", SignUpAdmin);
UserRouter.post("/login", Login);
UserRouter.get("/isAuth", isAuth);
UserRouter.get("/", getLoggedInUser);
UserRouter.get("/logout", Logout);
UserRouter.put("/:id", updateUser)

module.exports = UserRouter;
