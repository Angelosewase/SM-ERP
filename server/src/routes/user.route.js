const express = require("express");
const {
  isAuth,
  getLoggedInUser,
  updateUser,
  uploadProfileImage,
} = require("../controllers/userController");
const { uploadSingle } = require("../middlewares/multer");
const { authenticate } = require("../middlewares/auth");
const UserRouter = express.Router();

UserRouter.get("/isAuth", isAuth);
UserRouter.get("/", authenticate, getLoggedInUser);
UserRouter.put("/:id", authenticate, updateUser);
UserRouter.post("/upload", authenticate, uploadSingle, uploadProfileImage);

module.exports = UserRouter;
