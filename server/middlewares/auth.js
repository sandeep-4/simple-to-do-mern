const Owner = require("../models/owner");
const generateToken = require("../token/generateToken");
const _ = require("lodash");
const parseToken = require("../token/parseToken");

exports.requireOwnerSignIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const owner = parseToken(token);
    const founderOwner = await Owner.findById(owner._id).select(
      "name role salt hashed_password"
    );
    if (founderOwner) {
      req.ownerauth = founderOwner;
      next();
    } else res.status(401).json({ error: "Not authorized" });
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};

exports.requireSuperAdminSignIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const owner = parseToken(token);
    const founderOwner = await Owner.findById(owner._id).select("name role");
    if (founderOwner.role === "superadmin") {
      req.ownerauth = founderOwner;
      next();
    } else res.status(401).json({ error: "Not authorized" });
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};

exports.isPoster = async (req, res, next) => {
  let sameUser =
    req.bus &&
    req.ownerauth &&
    req.bus.owner._id.toString() === req.ownerauth._id.toString();
  let adminUser =
    req.bus && req.ownerauth && req.ownerauth.role === "superadmin";

  let isPoster = sameUser || adminUser;
  if (!isPoster) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }
  next();
};

exports.isBookingOwner = async (req, res, next) => {
  let sameUser =
    req.bus &&
    req.ownerauth &&
    req.bus.owner._id.toString() === req.ownerauth._id.toString();
  let adminUser =
    req.bus && req.ownerauth && req.ownerauth.role === "superadmin";

  let isPoster = sameUser || adminUser;
  if (!isPoster) {
    return res.status(401).json({
      error: "Not authorized",
    });
  }
  next();
};

exports.isAuth = async (req, res, next) => {
  let user =
    req.ownerprofile &&
    req.ownerauth &&
    req.ownerprofile._id.toString() === req.ownerauth._id.toString();
  if (!user) {
    return res.status(401).json({
      error: "Access denied",
    });
  }
};
