const mongoose = require("mongoose");

const server = process.env.MONGODB;

const connectToDb = () => {
  mongoose
    .connect(server, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongoDb");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDb;
