const Booking = require("../models/booking");
const Bus = require("../models/bus");
const Guest = require("../models/guest");
const _ = require("lodash");

exports.bookingById = async (req, res, next, id) => {
  const booking = await Booking.findById(id).populate("bus owner guest user");
  if (!booking) {
    return res.status(401).json({
      error: "booking not found",
    });
  }
  req.booking = booking;
  next();
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate("bus owner guest user self");
  res.json(bookings);
};

exports.getOwnerBookings = async (req, res) => {
  const bookings = await Booking.find({ owner: req.ownerauth }).populate(
    "bus owner guest user self"
  );
  res.json(bookings);
};

exports.postBooking = async (req, res) => {
  const booking = new Booking(req.body);
  if (req.userauth) {
    booking.user = req.userauth;
  } else {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    let user = await Guest.findOne({ phone });
    if (user) {
      user = _.extend(user, req.body);
      await user.save();
      booking.guest = user;
    } else {
      const guest = new Guest({ name, email, phone, address });
      await guest.save();
      booking.guest = guest;
    }
  }
  const bus = await Bus.findOne({ slug: req.bus.slug });
  if (
    bus.seatAvialible < (req.body.passengers || booking.passangers) ||
    bus.isAvaliable !== true ||
    bus.soldSeat.includes(booking.seatNumber) ||
    bus.bookedSeat.includes(booking.seatNumber)
  ) {
    return res.status(400).json({
      error: "Not found",
    });
  }
  bus.seatAvialible -= req.body.passangers || booking.passangers;
  bus.bookedSeat.push(booking.seatNumber);
  booking.bus = bus;
  booking.owner = bus.owner;
  await booking.save();
  await bus.save();
  res.json(bookings);
};

exports.postSold = async (req, res) => {
  const booking = new Booking(req.body);
  booking.self = req.ownerauth;
  const bus = await Bus.findOne({ slug: req.bus.slug });
  if (
    bus.seatAvialible < (req.body.passengers || booking.passangers) ||
    bus.isAvaliable !== true ||
    bus.soldSeat.includes(booking.seatNumber) ||
    bus.bookedSeat.includes(booking.seatNumber)
  ) {
    return res.status(400).json({
      error: "Not found",
    });
  }
  bus.seatAvialible -= booking.passangers;
  bus.soldSeat.push(booking.seatNumber);
  booking.bus = bus;
  booking.owner = bus.owner;
  booking.verification = "payed";
  await booking.save();
  await bus.save();
  res.json(booking);
};

exports.changeVerificationStatus = async (req, res) => {
  const booking = req.booking;
  booking.verification = req.body.verification;
  await booking.save();
  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const booking = req.booking;
  const bus = await Bus.findOne({ slug: booking.bus.slug });
  if (booking.verification === "payed") {
    const removedIndexSold = bus.soldSeat
      .map((seat) => seat.toString())
      .indexOf(booking.seatNumber);
    bus.bookedSeat.splice(removedIndexbook, 1);
  }
  await booking.remove();
  await bus.save();
  res.json(booking);
};
