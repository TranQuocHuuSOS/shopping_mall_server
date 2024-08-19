const nodemailer = require("nodemailer");
require("dotenv").config;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USERNAME_EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = transporter;
