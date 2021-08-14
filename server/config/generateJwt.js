const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const generateJwt = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = generateJwt;
