const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const busSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    type: {
      type: String,
      enum: ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"],
    },
    busNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    fare: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    features: {
      type: [],
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    seatsAvailable: {
      type: Number,
      default: 30,
      trim: true,
      maxlength: 32,
    },
    bookedSeat: {
      type: [],
    },
    soldSeat: {
      type: [],
    },
    numberOfSeats: {
      type: Number,
      default: 30,
      trim: true,
      maxlength: 32,
    },
    image: {
      type: String,
    },
    departure_time: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    isAvialiable: {
      type: Boolean,
      default: false,
    },
    travel: {
      type: ObjectId,
      ref: "Travel",
    },
    startLocation: {
      type: ObjectId,
      ref: "Location",
    },
    endLocation: {
      type: ObjectId,
      ref: "Location",
    },
    journeyDate: {
      type: String,
    },
    owner: {
      type: ObjectId,
      ref: "Owner",
    },
    boardingPoints: [
      {
        type: String,
        trim: true,
      },
    ],
    droppingPoints: [
      {
        type: String,
        trim: true,
      },
    ],
    slug: {
      type: String,
      slug: "name",
      unique: true,
      slug_padding_size: 3,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);
