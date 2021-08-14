require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  MONGODB,
  SECRET,
};
