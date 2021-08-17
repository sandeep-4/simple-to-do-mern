const Owner = require("../models/owner");
const generateToken = require("../token/generateToken");
const _ = require("lodash");

exports.signup = async (req, res) => {
  const ownerExist = await Owner.findOne({ email: req.body.email });
  if (ownerExist) {
    return res.status(404).json({
      error: "User exists",
    });
  }
  const newOwner = new Owner(req.body);
  const owner = await newOwner.save();
  owner.salt = undefined;
  owner.hashed_password = undefined;
  res.json(owner);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const owner = await Owner.findOne({ email });
  if (!owner) {
    return res.status(404).json({
      error: "Invalid creds",
    });
  }
  if (owner.authinticate(password)) {
    return res.status(404).json({
      error: "Invalid credintials",
    });
  }
  const token = await generateToken(owner);
  return res.json({ token });
};

exports.refreshToken = async (req, res) => {
  if (req.body && req.body._id) {
    const owner = await Owner.findOne({ _id: req.body._id });
    const token = await generateToken(owner);
    return res.json({ token });
  }
  return res.json({ error: "Invalid content" });
};
