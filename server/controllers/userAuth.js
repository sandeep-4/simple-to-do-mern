const User = require("../models/user");
const _ = require("lodash");
const { sendMail } = require("../helpers/mailer");
const generateToken = require("../token/generateToken");
const parseToken = require("../token/parseToken");

exports.signupUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(404).json({
      error: "User already exists",
    });
  }
  const newUser = new User(req.body);
  const user = await newUser.save();
  user.salt = undefined;
  user.hashed_password = undefined;
  res.json(user);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      error: "User not exists",
    });
  }
  if (!user.authenticate(password)) {
    return res.status(404).json({
      error: "Invalid credintials",
    });
  }
  const token = await generateToken(user);
  return res.json({ token });
};

exports.refreshToken = async (req, res) => {
  if (req.body && req.body.token) {
    const parsed = parseToken(`Beare ${req.body.token}`);
    const user = await User.findById(parsed._id);
    const token = generateToken(user);
    return res.json({ token });
  }
  return res.json({ error: "Invalid creds" });
};

exports.socialLogin = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    user = new User(req.body);
    req.userprofile = user;
    user.save();
    const token = generateToken(user);
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  } else {
    req.userprofile = user;
    user = _.extend(user, req.body);
    await user.save();
    const token = await generateToken(user);
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  }
};

exports.forgotPassword = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No body" });
  if (!req.body.email) return res.status(400).json({ message: "No email" });

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      error: "User not exists",
    });
  }
  const token = generateToken(user);
  const emailData = {
    from: "bus_no_reply@auth.com",
    to: email,
    subject: `Reset password`,
    text: `Please use the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    html: `<p>Please use the following link to reset your password:</p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
  };
  return user.updateOne({ resetPasswordLink: token }, (err, success) => {
    if (err) {
      return res.json({ message: err });
    } else {
      sendMail(emailData);
      return res.status(201).json({
        message: `Please check your mail at ${email}`,
      });
    }
  });
};

exports.resetPassword = async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  let user = await User.findOne({ resetPasswordLink });
  if (!user) {
    return res.status(401).json({
      error: "Invalid Link",
    });
  }
  const updatedFileds = {
    password: newPassword,
    resetPasswordLink: "",
  };
  user = _.extend(user, updatedFileds);
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Now use new password",
    });
  });
};
