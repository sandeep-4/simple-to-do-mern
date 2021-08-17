const express = require("express");
const { signup, login, refreshToken } = require("../controllers/auth-owner");
const { userSignUpValidator } = require("../validators");
const router = express.Router();

router.post("/signup", userSignUpValidator, signup);
router.post("/signin", login);
router.post("/refreshtoken", refreshToken);

module.exports = router;
