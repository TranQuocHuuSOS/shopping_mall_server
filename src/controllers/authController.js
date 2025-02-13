const asyncHandler = require("async-handler");
const UserModel = require("../models/userModel");
const bcryp = require("bcryptjs");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USERNAME_EMAIL,
    pass: process.env.PASSWORD
  }
});

const getJsonWebToken = async (email, id) => {
  const payload = {
    email,
    id
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
  return token;
};

const handleSendMail = async (val) => {
  try {
    const result = await transporter.sendMail(val);
    return "OK";
  } catch (error) {
    return error;
  }
};

const verification = asyncHandle(async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.round(1000 + Math.random() * 9000);
  try {
    const data = {
      from: `Support EventHub Application <${process.env.USERNAME_EMAIL}>`,
      to: email,
      subject: "Verification email code",
      text: "Your code to verification email",
      html: `<h1>${verificationCode}</h1>`
    };
    await handleSendMail(data);
    res.status(200).json({
      message: "Send verification code successfully!!!",
      data: {
        code: verificationCode
      }
    });
  } catch (error) {
    res.status(401);
    throw new Error("Can not send email");
  }
});

const register = asyncHandle(async (req, res) => {
  const { fullname, role, email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User has already exist!!!");
  }
  const salt = await bcryp.genSalt(10);
  const hashedPassword = await bcryp.hash(password, salt);
  const newUser = new UserModel({
    fullname: fullname ?? "",
    role: role,
    email,
    password: hashedPassword
  });
  await newUser.save();
  res.status(200).json({
    message: "Register new user successfully",
    data: {
      id: newUser.id,
      fullname: newUser.fullname,
      role: newUser.role,
      email: newUser.email,
      accessToken: await getJsonWebToken(email, newUser.id)
    }
  });
});

const login = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(403).json({
      message: "User not found!!!"
    });
    throw new Error("User not found!!!");
  }
  const isMatchPassword = await bcryp.compare(password, existingUser.password);
  if (!isMatchPassword) {
    res.status(401);
    throw new Error("Email or password is not correct!!!");
  }
  const accessToken = await getJsonWebToken(email, existingUser.id);
  existingUser.token = accessToken;
  await existingUser.save();
  res.status(200).json({
    message: "Login successfully!!!",
    data: {
      id: existingUser.id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      role: existingUser.role,
      accessToken: accessToken
    }
  });
});

const forgotPassword = asyncHandle(async (req, res) => {
  const { email } = req.body;
  const randomPassword = Math.round(100000 + Math.random() * 99000);
  const data = {
    from: `New Password <${process.env.USERNAME_EMAIL}>`,
    to: email,
    subject: "Verification email code",
    text: "Your code to verification email",
    html: `<h1>${randomPassword}</h1>`
  };
  const user = await UserModel.findOne({ email });
  if (user) {
    const salt = await bcryp.genSalt(10);
    const hashedPassword = await bcryp.hash(`${randomPassword}`, salt);
    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      isChangePassword: true
    })
      .then(() => {
        console.log("Done");
      })
      .catch((error) => console.log(error));

    await handleSendMail(data)
      .then(() => {
        res.status(200).json({
          message: "Send mail new password successfully!!!",
          data: []
        });
      })
      .catch((error) => {
        res.status(401);
        throw new Error("Can not send email");
      });
    res.send("huu");
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const logout = asyncHandle(async (req, res) => {
  const { email } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(403).json({
      message: "User not found!!!"
    });
    throw new Error("User not found!!!");
  }
  existingUser.token = null;
  await existingUser.save();
  res.status(200).json({
    message: "Logout successfully!!!"
  });
});

const getUsers = asyncHandle(async (req, res) => {
  try {
    const users = await UserModel.find({ role: { $ne: "admin" } }, "");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error
    });
  }
});

module.exports = {
  register,
  login,
  verification,
  forgotPassword,
  logout,
  getUsers
};
