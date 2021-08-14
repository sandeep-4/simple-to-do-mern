const express = require("express");
const router = express.Router();

//controllers
const {
  getEntries,
  addNewEntries,
  deleteEntry,
  updateEntry,
  starEntry,
  markEntryAsViewd,
} = require("../contrrollers/entry");
const { auth } = require("../middlewares/jwt");

router.get("/", auth, getEntries);
router.post("/", auth, addNewEntries);
router.delete("/:id", auth, deleteEntry);
router.put("/:id", auth, updateEntry);
router.patch("/:id/star", auth, starEntry);
router.patch("/:id/view", auth, markEntryAsViewd);

module.exports = router;
