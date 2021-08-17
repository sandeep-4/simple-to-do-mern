const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const expressValidator = require("express-validator");
require("express-async-errors");
require("dotenv").config();

const port = process.env.PORT;

const connectToDb = require("./db");
const { runEveryMidnight } = require("./helpers/misc");
const { errorHandler } = require("./helpers/dbErrorHandler");

//routers
const authUserRoutes = require("./routes/authUser");
const authOwnerRoutes = require("./routes/authOwner");
const busRoutes = require("./routes/bus");
const bookingRoutes = require("./routes/booking");
const guestRoutes = require("./routes/guest");
const locationRoutes = require("./routes/location");
const ownerRoutes = require("./routes/owner");
const travelRoutes = require("./routes/travel");
const userRoutes = require("./routes/user");

connectToDb();

//middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

//routes
app.use("/api/auth-owner", authOwnerRoutes);
app.use("/api/auth-user", authUserRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/travels", travelRoutes);
app.use("/api/users", userRoutes);

app.use(function (err, req, res, next) {
  return res.status(500).json({
    error: errorHandler(err) || "Opps something went wrong",
  });
});

runEveryMidnight();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
