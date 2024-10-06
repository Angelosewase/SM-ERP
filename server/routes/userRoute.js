const express = require("express");
const { SignUpAdmin, Login, isAuth } = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/registerUser", SignUpAdmin);
UserRouter.post("/login", Login);
UserRouter.get("/isAuth", isAuth);

module.exports = UserRouter;
