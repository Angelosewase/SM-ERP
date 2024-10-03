const express = require("express");
const { SignUpAdmin } = require("../controllers/userController");

const UserRouter = express.Router();

UserRouter.post("/Registe", SignUpAdmin);

module.exports = UserRouter;
