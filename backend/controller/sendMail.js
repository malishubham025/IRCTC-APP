const nodemailer = require('nodemailer');
const transporter=require("../models/transporter");

// Send OTP
async function sendOTP(email, otp) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully!');
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}

// Generate and send OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
sendOTP('recipient-email@gmail.com', otp);
