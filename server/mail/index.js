const { generateSignUpOtp } = require("../auth/otp");
const { transporter } = require("../config/nodemailer");

async function sendEmail(recipientEmail, subject, message, isHtml = false) {
  console.log("email sent to", recipientEmail);
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: subject,
      ...(isHtml ? { html: message } : { text: message }),
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
    const otp = await generateSignUpOtp(userId);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .header {
              background-color: #4A90E2;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #e9e9e9;
              border-radius: 0 0 5px 5px;
            }
            .otp-code {
              font-size: 32px;
              font-weight: bold;
              color: #4A90E2;
              text-align: center;
              padding: 20px;
              margin: 20px 0;
              background-color: #f8f9fa;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Account Verification</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>Thank you for registering with Brainiacs. To complete your account verification, please use the following OTP code:</p>
              <div class="otp-code">${otp}</div>
              <p>This code will expire in 5 minutes for security purposes.</p>
              <p>If you didn't request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply.</p>
              <p>&copy; ${new Date().getFullYear()} Brainiacs. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail(email, "Brainiacs Account Verification", htmlContent, true);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

module.exports = { sendEmail, sendOtp };
