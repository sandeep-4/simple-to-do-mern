const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const entryRoutes = require("./routes/entry");
const { unknownEndpointHandler, errorHandler } = require("./middlewares/jwt");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api", authRoutes);
app.use("/api/entries", entryRoutes);

app.use(unknownEndpointHandler);
app.use(errorHandler);

module.exports = app;
