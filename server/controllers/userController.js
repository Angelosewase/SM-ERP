const {
  UserModel,
  SchoolModel,
  ProfilePicModel,
} = require("../models/Schemas.js");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  userUpdateSchema,
} = require("../validators/user.js");

const {
  generateJwtToken,
  validateJwtToken,
  getUserIdFromToken,
} = require("../utils/jwt.js");
const { uploadToCloudinary } = require("../config/cloudinaryConfig.js");

async function isAuth(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }
  const isValid = validateJwtToken(token);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.status(200).json({ message: "Authorized" });
}

async function getLoggedInUser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ message: "unauthorised" });
    return;
  }

  const UserId = getUserIdFromToken(token);
  if (!UserId) {
    re.status(401).send({ message: "Invalid credentials" });
    return;
  }
  const user = await UserModel.findById(UserId);
  if (!user) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  res.status(200).json(user);
}

async function updateUser(req, res) {
  const { id } = req.params;

  try {
    const validatedData = userUpdateSchema.parse(req.body);
    const updatedUser = await UserModel.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Server error", error });
  }
}

async function uploadProfileImage(req, res) {
  const userId = getUserIdFromToken(req.cookies.token);
  if (!userId) {
    res.status(401).send({ message: "unauthorised" });
    return;
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  if (!req.file) {
    res.status(400).send({ message: "No file uploaded" });
    return;
  }
  profileImage = req.file.path;

  try {
    const result = await uploadToCloudinary(profileImage);
    const profilepic = new ProfilePicModel({
      userId: userId,
      url: result.url,
      secure_url: result.secure_url,
    });
    await profilepic.save();

    res.status(201).json({
      message: "uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  isAuth,
  getLoggedInUser,
  updateUser,
  uploadProfileImage,
};
