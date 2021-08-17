const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maclength: 32,
  },
  distric: {
    type: String,
    required: true,
    trim: true,
    maclength: 32,
  },
});

module.exports = mongoose.model("Location", locationSchema);
