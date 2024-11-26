const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
function getAccessToken(token) {
  try {
    return  jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

function getRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}

function getUserIdFromToken(token) {
  const decoded = getAccessToken(token);
  return decoded ? decoded.userId : null;
}

function getSchoolIdFromToken(token) {
  const decoded = getAccessToken(token);
  return decoded ? decoded.schoolId : null;
}

module.exports = {
  getUserIdFromToken,
  getSchoolIdFromToken,
  getSchoolIdFromToken,
  getRefreshToken, 
  getAccessToken
};
