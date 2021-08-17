const Bus = require("../models/bus");
const _ = require("lodash");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const { checkDateAvilibity } = require("../helpers/misc");

exports.busBySlug = async (req, res, next, slug) => {
  const bus = await Bus.findOne({ slug }).populate("owner", "name role");
  if (!bus) {
    return res.status(401).json({
      error: "Noo bus",
    });
  }
  req.bus = bus;
  next();
};

exports.read = async (req, res) => {
  return res.json(req.bus);
};

exports.getBuses = async (req, res) => {
  const buses = await Bus.find()
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(buses);
};

exports.getAllAvialiableBuses = async (req, res) => {
  const buses = await Bus.find({ isAvialiable: true })
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(buses);
};

exports.getAllUnAvilableBuses = async (req, res) => {
  const buses = await Bus.find({ isAvilable: false })
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(buses);
};

exports.getAvilalableBusesOfOwner = async (req, res) => {
  const buses = await Bus.find({ owner: req.ownerauth, isAvilable: true })
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(buses);
};

exports.getUnavilableBusesOfOwner = async (req, res) => {
  const buses = await Bus.find({ owner: req.ownerauth, isAvilable: false })
    .populate("owner", "name")
    .populate("travel", "name")
    .sort({ created: -1 });

  res.json(buses);
};

exports.searchBus = async (req, res) => {
  if (_.size(req.query) < 1)
    return res.status(400).json({ error: "Invalid query" });

  const { startLocation, endLocation, journeyDate } = req.query;
  const bus = await Bus.find({
    startLocation,
    endLocation,
    journeyDate,
    isAvialiable: true,
  })
    .populate("travel", "name")
    .populate("startLocation", "name")
    .populate("endLocation", "name");
  return res.json(bus);
};

exports.searchBusByFilter = async (req, res) => {
  const { startLocation, endLocation, journeyDate, travel, type } = req.body;
  const bus = await Bus.find({
    startLocation,
    endLocation,
    journeyDate,
    isAvialiable: true,
    travel: { $in: travel },
    type: { $in: type },
  })
    .populate("travel", "name")
    .populate("startLocation", "name")
    .populate("endLocation", "name");
  return res.json(bus);
};

exports.create = async (req, res) => {
  const busExists = await Bus.findOne({ busNumber: req.body.busNumber });
  if (busExists) {
    return res.status(403).json({
      error: "Bus is already added",
    });
  }
  if (req.file !== undenfined) {
    const { filename: image } = req.file;
    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, "resized", image));
    fs.unlinkSync(req.file.path);
    req.body.image = "busimage/resized/" + image;
  }
  if (req.body.boardingPoints) {
    req.body.boardingPoints = req.body.boardingPoints.split(",");
  }
  if (req.body.droppingPoints) {
    req.body.droppingPoints = req.body.droppingPoints.split(",");
  }
  const bus = new Bus(req.body);
  if (!checkDateAvilibity(req.body.journeyDate)) {
    bus.isAvialiable = false;
  }
  bus.owner = req.ownerauth;
  await bus.save();
  res.json(bus);
};

exports.update = async (req, res) => {
  if (req.file !== undefined) {
    const { fileName: image } = req.files;
    await sharp(req.file.path)
      .resize(800)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, "resized", image));
    fs.unlinkSync(req.file.path);
    req.body.image = "busimage/resized/" + image;
  }
  let bus = req.bus;
  bus = _.extended(bus, req.body);
  if (!checkDateAvilibity(req.body.journeyDate)) {
    bus.isAvialiable = false;
  }
  await bus.save();
  res.json(bus);
};

exports.remove = async (req, res) => {
  let bus = req.bus;
  await bus.remove();
  res.json({ message: "Bus removed" });
};
