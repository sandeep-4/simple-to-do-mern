const Owner = require("../models/owner");
const _ = require("lodash");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

exports.getAllOwener = async (req, res) => {
  const owners = await Owner.find()
    .sort({ createdAt: -1 })
    .select("name email phone createdAt updatedAt role");
  res.json(owner);
};

exports.ownerById = async (req, res) => {
  const owner = await Owner.findById(id);
  if (owner) {
    owner.salt = undefined;
    owner.hashed_password = undefined;
    req.ownerprofile = owner;
    next();
  } else {
    res.status(400).json({ error: "Owner not found" });
  }
};

exports.read = async (req, res) => {
  return res.json(req.ownerprofile);
};

exports.update = async (req, res) => {
  let formbody = {};
  if (req.file !== undefined) {
    const { filename: photo } = req.file;
    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, "resized", photo));
    fs.unlinkSync(req.file.path);
    req.body.photo = "ownerAvatar/resized/" + photo;
    formbody = { photo: req.body.photo };
  }
  let owner = req.ownerauth;
  if (req.body.oldPassword && req.body.newPassword) {
    if (!owner.authenticate(req.body.oldPassword)) {
      return res.status(401).json({
        error: "Error Password",
      });
    } else {
      formbody = { ...formbody, password: req.body.newPassword };
    }
  }
  owner = _.extend(owner, formbody);
  await owner.save();
  owner.hashed_password = undefined;
  owner.salt = undefined;
  res.json(owner);
};
