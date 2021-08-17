const express = require("express");
const {
  getAllOwener,
  read,
  update,
  ownerById,
} = require("../controllers/owner");
const { uploadOwnerAvatar } = require("../helpers/multer");
const { requireOwnerSignIn, isAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllOwener);
router.get("/:ownerId", read);
router.put("/:ownerId", requireOwnerSignIn, isAuth, uploadOwnerAvatar, update);
router.param("ownerId", ownerById);

module.exports = router;
