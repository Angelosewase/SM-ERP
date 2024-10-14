const { UserModel, SchoolModel } = require("../models/Schemas.js");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  registerUserInfoValidator,
  loginInfoValidator,
  userUpdateSchema,
} = require("../validators/user.js");

const {
  generateJwtToken,
  validateJwtToken,
  getUserIdFromToken,
} = require("../utils/jwt.js");
const mongooose = require("mongoose");
const { generateTheuserResponse, generateTheSchoolRespose } = require("../services/userService.js");

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const validatedData = loginInfoValidator.parse({ email, password });
    const user = await UserModel.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const associatedSchool = await SchoolModel.findOne({ _id: user.school });

    if (!associatedSchool) {
      res.status(404).json({ message: "Invalid user data" });
      return;
    }

    const userResponse = generateTheuserResponse(user)
    const schoolResponse = generateTheSchoolRespose(associatedSchool);

    const token = generateJwtToken({ id: user._id , schoolId: associatedSchool._id});
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: false,
      path: "/",
    });
    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      school: schoolResponse,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid login data", errors: error.errors });
    }
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function SignUpAdmin(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const validatedData = registerUserInfoValidator.parse({
      firstName,
      lastName,
      email,
      password,
    });

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = new UserModel({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();

    res
      .status(200)
      .json({ message: "Admin user created successfully", id: user._id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid registration data", errors: error.errors });
    }

    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

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

async function Logout(req, res) {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now() - 3600000),
      httpOnly: true,
      secure: false,
      path: "/",
    });

    res.status(200).send({ message: "logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "request failed" });
  }
}


async function updateUser(req,res){
  const { id } = req.params;

  try {
 
    const validatedData = userUpdateSchema.parse(req.body);
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
  console.log(error)
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = { SignUpAdmin, Login, isAuth, getLoggedInUser, Logout,updateUser };
