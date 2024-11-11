const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
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

module.exports = { sendEmail };
