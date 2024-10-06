const {validateJwtToken}= require("../utils/jwt")

function isAuth(req, res , next){
      const jwtToken = req.Cookies.jwtToken
      if(!jwtToken){
        res.status(500).send({"message":"user not authorised please login first"})
        return
      }

      const isValid = validateJwtToken(jwtToken);
      if(!isValid){
        res.status(500).send({"message":"Invalid credentials"})
        return
      }
      next()
}

module.exports = {isAuth}