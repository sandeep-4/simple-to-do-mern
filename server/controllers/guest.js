const Guest = require("../models/guest");

exports.getAllGuests = async (req, res) => {
  const guests = await Guest.find()
    .sort({ createdAt: -1 })
    .select("name email phone createdAt updatedAt address");

  res.json(guests);
};
