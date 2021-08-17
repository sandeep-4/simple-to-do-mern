const User = require("../models/user");
const parseToken = require("../token/parseToken");

exports.checkUserSignIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    const founderUser = await User.findById(user._id).select("name");
    if (founderUser) {
      req.userauth = founderUser;
    }
  }
  next();
};

exports.isUser = async (req, res) => {
  let user =
    req.userprofile &&
    user.userauth &&
    req.userprofile._id.toString() === req.userauth._id.toString();
  if (!user) {
    return res.status(401).json({
      error: "Access denied",
    });
  }
  next();
};
