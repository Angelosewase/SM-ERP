const { validateJwtToken } = require("../utils/jwt");

async function isAuth(req, res, next) {
  let jwtToken;
  try {
    jwtToken = req.cookies.token;
    if (!jwtToken) {
      res.status(500).send({ message: "user not authorised please login first" });
      return;
    }
  
    const isValid = validateJwtToken(jwtToken);
    if (!isValid) {
      res.status(500).send({ message: "Invalid credentials" });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: "Invalid credentials" });
    return;
    return 
  }


  next();
}

module.exports = { isAuth };
