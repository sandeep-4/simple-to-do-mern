const express = require("express");
const {
  getLocations,
  add,
  read,
  remove,
  update,
} = require("../controllers/location");
const { requireSuperAdminSignIn } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getLocations);
router.post("/", requireSuperAdminSignIn, add);
router.get("/:id", requireSuperAdminSignIn, read);
router.put("/:id", requireSuperAdminSignIn, update);
router.delete("/:id", requireSuperAdminSignIn, remove);

module.exports = router;
