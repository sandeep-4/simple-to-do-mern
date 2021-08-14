const express = require("express");
const { registerUser, loginUser } = require("../contrrollers/auth");
const router = express.Router();

router.post("/register", registerUser);
router.put("/login", loginUser);

module.exports = router;
