const {
  validateAccessToken,
  validateRefreshToken,
  generateAccessToken,
} = require("../auth/signTokens");
const { UserModel } = require("../models/Schemas");

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
          .json({
            authorised: false,
            message: "not authorised, user not found",
          });
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

module.exports = { authenticate };
