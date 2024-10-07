const {UserModel} = require("../models/Schemas.js");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  registerUserInfoValidator,
  loginInfoValidator,
} = require("../validators/user.js");

const { generateJwtToken, validateJwtToken } = require("../utils/jwt.js");

const JWT_SECRET = process.env.JWT_SECRET;
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

    const token = generateJwtToken({ id: user._id, role: user.role });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: false,
      path:"/"
    });
    res.status(200).json({ message: "Login successful", userId: user._id });
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

module.exports = { SignUpAdmin, Login, isAuth };
