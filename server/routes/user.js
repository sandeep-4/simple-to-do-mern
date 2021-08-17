const express = require("express");
const { getAllUsers, read, userById } = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", read);

router.param("userId", userById);

module.exports = router;
