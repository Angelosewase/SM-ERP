const jwt = require("jsonwebtoken");
require("dotenv").config();
const SecretKey = process.env.JWT_SECRET;
function generateJwtToken({ id, role, schoolId }) {
  return jwt.sign({ userId: id, role, schoolId }, SecretKey, {
    expiresIn: "24h",
  });
}
function validateJwtToken(token) {
  try {
    return jwt.verify(token, SecretKey);
  } catch (error) {
    return null;
  }
}

function getUserIdFromToken(token) {
  const decoded = validateJwtToken(token);
  return decoded ? decoded.userId : null;
}

function getSchoolIdFromToken(token) {
  const decoded = validateJwtToken(token);
  return decoded ? decoded.schoolId : null;
}

function getSchoolIdFromToken(token) {
  const decoded = validateJwtToken(token);
  return decoded ? decoded.schoolId : null;
}

module.exports = {
  generateJwtToken,
  validateJwtToken,
  getUserIdFromToken,
  getSchoolIdFromToken,
  getSchoolIdFromToken,
};
