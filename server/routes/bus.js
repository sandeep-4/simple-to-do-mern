const express = require("express");
const {
  getBuses,
  create,
  getAvilalableBusesOfOwner,
  getUnavilableBusesOfOwner,
  getAllAvialiableBuses,
  getAllUnAvilableBuses,
  searchBus,
  searchBusByFilter,
  read,
  update,
  remove,
  busBySlug,
} = require("../controllers/bus");
const { uploadBusImage } = require("../helpers/multer");
const { requireOwnerSignIn, isPoster } = require("../middlewares/auth");
const router = express.Router();

router.get("/", getBuses);
router.post("/", requireOwnerSignIn, uploadBusImage, create);
router.get(
  "/owner-bus-aviliable",
  requireOwnerSignIn,
  getAvilalableBusesOfOwner
);
router.get(
  "/owner-bus-unavailable",
  requireOwnerSignIn,
  getUnavilableBusesOfOwner
);
router.get("/all-bus-avialiable", getAllAvialiableBuses);
router.get("/app-bus-unavilaible", getAllUnAvilableBuses);
router.get("/search", searchBus);
router.post("/filter", searchBusByFilter);
router.get("/:busSlug", read);
router.put("/:busSlug", requireOwnerSignIn, isPoster, uploadBusImage, update);
router.delete("/:busSlug", requireOwnerSignIn, isPoster, remove);

router.param("busSlug", busBySlug);

module.exports = router;
