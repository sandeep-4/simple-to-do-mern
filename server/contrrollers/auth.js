const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const generateJwt = require("../config/generateJwt");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { SECRET } = require("../config/config");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      error: "User exists",
    });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({
      error: "User exists",
    });
  }
  const token = await generateJwt(user);
  res.status(200).json({
    token,
    displayName: user.displayName,
    email: user.email,
  });
};

exports.registerUser = async (req, res) => {
  const { displayName, email, password } = req.body;
  if (!password || password.length < 6) {
    return res.status(401).json({
      error: "Password must be grater to 6",
    });
  }
  if (!email || validator.isEmail(email)) {
    return res.status(401).json({
      error: "Invalid email",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({
      error: "User exists",
    });
  }
  const salt = 12;
  const hadhPassword = await bcrypt.hash(password, salt);
  const user = new User({
    displayName,
    email,
    passwordHash,
  });

  const savedUser = await user.save();
  const token = await generateJwt(user);
  res.status(200).json({
    token,
    displayName: savedUser.displayName,
    email: savedUser.email,
  });
};
