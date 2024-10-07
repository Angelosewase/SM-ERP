const express = require("express");
const { SignUpAdmin, Login, isAuth, getLoggedInUser } = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/registerUser", SignUpAdmin);
UserRouter.post("/login", Login);
UserRouter.get("/isAuth", isAuth);
UserRouter.get("/", getLoggedInUser)
//handler functions to get user when authorised 


module.exports = UserRouter;
