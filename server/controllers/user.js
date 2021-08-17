const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("name email phone createdAt updatedAt address");
  res.json(users);
};

exports.userById = async (req, res, next, id) => {
  const user = await User.findById(id);
  if (user) {
    user.salt = undefined;
    user.hashed_password = undefined;
    req.userprofile = user;
    next();
  } else {
    res.status(404).json({
      error: "No users",
    });
  }
};

exports.read = async (req, res) => {
  return res.json(req.userprofile);
};
