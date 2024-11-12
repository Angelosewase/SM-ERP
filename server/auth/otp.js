const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { OtpModel } = require("../models/Schemas");


async function generateSignUpOtp(userId) {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: true,
      lowerCaseAlphabets: true,
      digits: true,
      specialChars: false,
    });
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await OtpModel.create({ userId, otpValue: otpHash, expiresAt });
    // console.log(otp)
    return otp;
  } catch (error) {
    console.error("Error generating OTP:", error);
    throw new Error("Failed to generate OTP.");
  }
}


async function verifyOtp(userId, otpVal) {
  try {
    const otpRecord = await OtpModel.findOne({ userId });
    if (!otpRecord || Date(otpRecord.expiresAt) < Date.now()) {
      return { success: false, message: "OTP has expired or is invalid." };
    }
    const isMatch = await bcrypt.compare(otpVal, otpRecord.otpValue);
    if (!isMatch) {
      return { success: false, message: "Invalid OTP." };
    }
    await OtpModel.deleteOne({ userId });
    console.log("done verifying")
    return { success: true, message: "OTP verified successfully." };
  
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP.");
  }
}




module.exports ={generateSignUpOtp, verifyOtp}