const nodemailer = require("nodemailer");
const { generateSignUpOtp } = require("../auth/otp");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls:{
    rejectUnauthorized:false
  }
});

async function sendEmail(recipientEmail, subject, message) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: subject,
      text: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}

async function sendOtp(email, userId) {
  try {
    const otp =  await generateSignUpOtp(userId);
    sendEmail(
      email,
      "Brainiacs account verification",
      `
      <h2> your acccount verification code is ${otp}<h2>
      <p>  It is valid for 5 minutes !<p> 
      `
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendEmail, sendOtp };
