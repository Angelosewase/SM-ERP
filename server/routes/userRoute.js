const express = require("express");
const { SignUpAdmin, Login } = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/registerUser", SignUpAdmin);
UserRouter.post("/login", Login);

module.exports = UserRouter;
