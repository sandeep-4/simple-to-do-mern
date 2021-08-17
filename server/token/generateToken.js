const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = generateToken;
