require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { getAccessToken, getRefreshToken } = require("../../utils/jwt");

const app = express();
app.use(express.json());
app.use(cookieParser());

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};
const generateRefreshToken = (userId) => {
  return jwt.sign(userId, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });a
};

const validateAccessToken = (token) => {
  const isValid = getAccessToken(token);
  if (isValid) {
    return isValid;
  }
  return false;
};

const validateRefreshToken = (token) => {
  const isvalid = getRefreshToken(token);
  if (isvalid) return isvalid;
  return false;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken
};
