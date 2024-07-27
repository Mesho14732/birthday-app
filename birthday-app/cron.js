const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('./Models/user.js');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule('0 7 * * *', async () => {
  const today = new Date();
  const users = await User.find({ dateOfBirth: { $dayOfMonth: today.getDate(), $month: today.getMonth() + 1 } });

  users.forEach(user => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Happy Birthday!',
      text: `Dear ${user.username},\n\nWishing you a wonderful birthday!\n\nBest regards,\nBirthday App Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });
});