const morgan = require("morgan");
const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

module.exports = (app) => {
  app.use(
    morgan("dev", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );
  const logDirectory = path.join(__dirname, "../logs");
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  const accessLogstream = rfs("accesss.log", {
    interval: "1d",
    path: logDirectory,
  });
  app.use(morgan("combined", { stream: accessLogstream }));
};
