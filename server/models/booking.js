const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    price: {
      type: String,
    },
    passengers: {
      type: Number,
      default: 1,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    boardingPoints: {
      type: String,
      required: true,
    },
    guest: {
      type: ObjectId,
      ref: "Guest",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    owner: {
      type: ObjectId,
      ref: "Owner",
    },
    bus: {
      type: ObjectId,
      ref: "Bus",
    },
    self: {
      type: ObjectId,
      ref: "Owner",
    },
    verification: {
      type: String,
      enum: ["verified", "notverifired", "payed"],
      default: "notverified",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
