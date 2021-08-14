const mongoose = require("mongoose");
const { MONGODB } = require("./config/config");

const connectToDb = () => {
  mongoose
    .connect(MONGODB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connnected to mongoDb");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDb;
