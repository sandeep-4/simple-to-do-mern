const express = require("express");
const {
  getTravels,
  add,
  read,
  remove,
  update,
} = require("../controllers/travel");
const { requireSuperAdminSignIn } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getTravels);
router.post("/", requireSuperAdminSignIn, add);
router.get("/:id", requireSuperAdminSignIn, read);
router.put("/:id", requireSuperAdminSignIn, update);
router.delete("/:id", requireSuperAdminSignIn, remove);

module.exports = router;
