const express = require("express");
const { getAllGuests } = require("../controllers/guest");
const router = express.Router();

router.get("/", getAllGuests);

module.exports = router;
