const express = require("express");
const {
  signupUser,
  loginUser,
  socialLogin,
  forgotPassword,
  resetPassword,
} = require("../controllers/userAuth");
const {
  userSignUpValidator,
  passwordResetValidator,
} = require("../validators");
const router = express.Router();

router.post("/signup", userSignUpValidator, signupUser);
router.post("/signin", loginUser);
router.post("/social-login", socialLogin);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

module.exports = router;
