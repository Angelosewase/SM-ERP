const express = require("express");
const {
  isAuth,
  getLoggedInUser,
  updateUser,
  uploadProfileImage,
} = require("../controllers/userController");
const { uploadSingle } = require("../middlewares/multer");
const UserRouter = express.Router();

UserRouter.get("/isAuth", isAuth);
UserRouter.get("/", getLoggedInUser);
UserRouter.put("/:id", updateUser);
UserRouter.post("/upload", uploadSingle, uploadProfileImage);

module.exports = UserRouter;
