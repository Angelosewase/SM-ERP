const jwt = require("jsonwebtoken");
require("dotenv").config();

const SecretKey = process.env.JWTKEY;

function generateJwtToken({id, role}) {
  return jwt.sign(
    { userId: id, role: role },
    SecretKey,
    { expiresIn: '1h' }
  );
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
  if (decoded) {
    return decoded.userId; 
  }
  return null; 
}

module.exports = { generateJwtToken, validateJwtToken, getUserIdFromToken };
