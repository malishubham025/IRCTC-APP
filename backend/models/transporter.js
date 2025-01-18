
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'malishubham025@gmail.com', // Replace with your email
      pass: process.env.mail_pass, // Use App Password if 2FA is enabled
    },
  });
module.exports=transporter;  