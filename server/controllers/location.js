const Location = require("../models/location");
const _ = require("lodash");

exports.locationById = async (req, res, next, id) => {
  const location = await Location.findById(id);
  if (!location) {
    res.status(401).json({
      error: "Location not found",
    });
  }
  req.location = location;
  next();
};

exports.add = async (req, res) => {
  const location = new Location(req.body);
  await location.save();
  res.json(location);
};

exports.getLocations = async (req, res) => {
  const location = await Location.find({}).sort({ name: 1 });
  res.json(location);
};

exports.read = async (req, res) => {
  res.json(req.location);
};

exports.update = async (req, res) => {
  let location = req.location;
  location = _.extend(location, req.body);
  await location.save();
  res.json(location);
};

exports.remove = async (req, res) => {
  let location = req.location;
  await location.remove();
  res.json({ message: "Location removed" });
};
