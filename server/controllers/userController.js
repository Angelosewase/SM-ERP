const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {registerUserInfoValidator, loginInfoValidator}= require("../validators/user.js")

const {generateJwtToken} = require("../utils/jwt.js")
 
const JWT_SECRET = process.env.JWT_SECRET
async function Login(req, res) {
  try {
    // Get the form data
    const { email, password } = req.body;

    // Validate the form data using Zod
    const validatedData = loginInfoValidator.parse({ email, password });

    // Check for the user in the database by email
    const user = await UserModel.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with bcrypt
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   const token = generateJwtToken({id:user._id,role:user.role})
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", userId: user._id });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid login data", errors: error.errors });
    }
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}


async function SignUpAdmin(req, res) {
  try {

    const { firstName, lastName, email, password } = req.body;

    // Validate user info using Zod before proceeding
    const validatedData = registerUserInfoValidator.parse({ firstName, lastName, email, password });

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create new user with admin role
    const user = new UserModel({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
      role: "admin",
    });

    // Save the user to the database
    await user.save();
    
    res.status(200).json({ message: "Admin user created successfully" });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid registration data", errors: error.errors });
    }
    
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
}

module.exports = { SignUpAdmin , Login};
