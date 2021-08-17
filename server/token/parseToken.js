const jwt = require("jsonwebtoken");

const parseToken = (token) => {
  try {
    return jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

module.exports = parseToken;
