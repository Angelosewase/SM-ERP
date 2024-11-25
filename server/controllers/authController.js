// const mongoose = require("mongoose");
const { UserModel, SchoolModel } = require("../models/Schemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  loginInfoValidator,
  registerUserInfoValidator,
} = require("../validators/user");
const {
  validateAccessToken,
  validateRefreshToken,
} = require("../auth/signTokens");

const z = require("zod");
const {
  generateTheuserResponse: generateTheUserResponse,
  generateTheSchoolRespose: generateTheSchoolResponse,
} = require("../services/userService");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../auth/signTokens");
const { verifyOtp } = require("../auth/otp");
const { sendOtp } = require("../mail");

const Login = async (req, res) => {
  const { token, accessToken } = req.cookies;
  if (token || accessToken) {
    res.json({ message: "already logged in" });
    return;
  }

  try {
    const { email, password } = req.body;
    const validatedData = loginInfoValidator.parse({ email, password });
    const user = await UserModel.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.active) {
      return res.status(401).json({ message: "Account is not activated" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const associatedSchool = await SchoolModel.findOne({ _id: user.school });

    if (!associatedSchool) {
      res.status(404).json({ message: "Invalid user data" });
      return;
    }
    const userResponse = generateTheUserResponse(user);
    const schoolResponse = generateTheSchoolResponse(associatedSchool);

    const accessToken = generateAccessToken({
      id: user._id,
      schoolId: associatedSchool._id,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id,
    });

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
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
    console.error("authController.js line 93: " + error);
    res.status(500).json({ message: "Server error" });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("authController.js line 106: " + error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = validateRefreshToken(refreshToken);
    const user = await UserModel.findById(decoded);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
      const token = generateAccessToken({
        id: user._id,
        schoolId: user.school,
      });
    res.cookies("token", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: "/",
    });
    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    console.error("authController.js line 134: " + error);
    res.status(500).json({ message: "Server error" });
  }
};

const signUpAdmin = async (req, res) => {
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
      active: false,
    });
    const savedUser = await user.save();
    sendOtp(email, savedUser._id);
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
};

async function authenticate(req, res, next) {
  const { token, refreshToken } = req.cookies;
  try {
    if (token) {
      const decoded = validateAccessToken(token);
      req.user = { id: decoded.id, schoolId: decoded.schoolId };
      return next();
    }
    if (refreshToken) {
      const decoded = validateRefreshToken(refreshToken);
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return res
          .status(401)
          .json({ authorised: false, message: "not authorised, user not found" });
      }
      const newAccessToken = generateAccessToken({
        id: user._id,
        schoolId: user.school,
      });
      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: "/",
      });

      req.user = { id: user._id, schoolId: user.school };
      return next();
    }

    return res
      .status(401)
      .json({ authorised: false, message: "not authorised" });
  } catch (error) {
    console.error("authController.js line 227: " + error);
    return res
      .status(401)
      .json({ authorised: false, message: "not authorised" });
  }
}

async function OtpAccountVerification(req, res) {
  const { userId } = req.params;

  try {
    const { otpCode } = req.body;
    if (!otpCode) {
      return res.status(400).json({ message: "OTP code is required" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.active) {
      return res.status(400).json({ message: "Account is already activated" });
    }
    const result = await verifyOtp(userId, otpCode);
    if (!result.success) {
      return res.json({ message: result.message });
    }
    user.active = true;
    await user.save();
    res
      .status(200)
      .json({ message: "Account has been successfully activated" });
  } catch (error) {
    console.error("authController.js line 241: Error in OtpAccountVerification: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function ChangePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const passwordSchema = z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter") 
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

    try {
      passwordSchema.parse(newPassword);
    } catch (error) {
    
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid password format",
          errors: error.errors.map(err => err.message)
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in ChangePassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function isLoggedIn(req, res) {
  const user = await UserModel.findById(req.user.id)
  if (!user) {
    return res.status(401).json({ message: "unauthorized" });
  }
  res.status(200).json({ authorised: true, user: generateTheUserResponse(user) })
}

module.exports = {
  Login,
  Logout,
  refreshToken,
  signUpAdmin,
  authenticate,
  OtpAccountVerification,
  ChangePassword,
  isLoggedIn,
};
