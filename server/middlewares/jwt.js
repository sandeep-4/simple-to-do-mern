const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send({
        error: "Access denied",
      });
    }
    const decodedToken = jwt.verify(jwt, SECRET);
    if (!decodedToken.id) {
      return res.status(401).send({
        error: "Access denied",
      });
    }
    req.user = decodedToken.id;
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const unknownEndpointHandler = (req, res) => {
  res.status(404).send({ message: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "CasteError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "Malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(404).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).send({ error: "Invalid token" });
  }
  next(error);
};

module.exports = {
  auth,
  unknownEndpointHandler,
  errorHandler,
};
