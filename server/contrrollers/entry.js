const Entry = require("../models/entry");
const User = require("../models/auth");
const validator = require("validator");

exports.getEntries = async (req, res) => {
  const entries = await Entry.find({ user: req.user }).exec();
  res.json(entries);
};

exports.addNewEntries = async (req, res) => {
  const { link, title, description, type, tags } = req.body;
  if (!link || !validator.isURL(link)) {
    return res.status(401).json({
      error: "Enter valid link",
    });
  }
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(401).json({
      error: "User not exist",
    });
  }
  const entry = new Entry({
    title,
    link,
    description,
    type,
    tags,
    user: user.id,
  });
  const savedEntry = await entry.save();
  res.status(201).json(savedEntry);
};

exports.deleteEntry = async (req, res) => {
  const { id: entryId } = req.params;
  const user = await User.findById(req.user);
  const entry = await Entry.findById(entryId);
  if (!user) {
    return res.status(401).json({
      error: "User dont exists",
    });
  }
  if (!entry) {
    return res.status(401).json({
      error: "Entry dont exist",
    });
  }
  if (entry.user.toString() !== user._id.toString()) {
    return res.status(401).json({
      error: "Access denieal",
    });
  }
  await Entry.findByIdAndDelete(entryId);
  res.status(201).json({ message: "Deleted" });
};

exports.updateEntry = async (req, res) => {
  const { id: entryId } = req.params;
  const { title, link, description, type, tags } = req.body;
  if (!title || !link || !description || !type || !tags) {
    return res.status(401).json({
      error: "All fields are required",
    });
  }
  if (!link || !validator.isURL(link)) {
    return res.status(401).json({
      error: "Enter valid link",
    });
  }
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(401).json({
      error: "User not found",
    });
  }
  const entry = await Entry.findById(entryId);
  if (!entry) {
    return res.status(401).json({
      error: "Entery not valid",
    });
  }
  if (entry.user.toString() !== user._id.toString()) {
    return res.status(401).json({
      error: "User not mtched",
    });
  }
  const entryObj = {
    title,
    link,
    description,
    tags,
    type,
    user: user._id,
  };
  const updatedEntry = await Entry.findByIdAndUpdate(entryId, entryObj, {
    new: true,
  });
  res.json(updatedEntry);
};

exports.starEntry = async (req, res) => {
  const { id: entryId } = req.params;
  const entry = await Entry.findById(entryId);
  if (!entry) {
    return res.status(401).json({
      error: "No entry",
    });
  }
  entry.isSatrred = !entry.isStarred;
  await entry.save();
  res.status(202).end();
};

exports.markEntryAsViewd = async (req, res) => {
  const { id: entryId } = req.params;
  const entry = await Entry.findById(entryId);
  if (!entry) {
    return res.status(402).json({
      error: "Error occourded",
    });
  }
  entry.isViewd = !entry.isViewd;
  await entry.save();
  res.status(201).end();
};
