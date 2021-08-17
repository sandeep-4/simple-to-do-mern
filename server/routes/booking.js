const express = require("express");
const {
  getOwnerBookings,
  getAllBookings,
  postSold,
  postBooking,
  changeVerificationStatus,
  deleteBooking,
  bookingById,
} = require("../controllers/booking");
const { busBySlug } = require("../controllers/bus");
const {
  requireOwnerSignIn,
  requireSuperAdminSignIn,
  isBookingOwner,
} = require("../middlewares/auth");
const { checkUserSignIn } = require("../middlewares/user");
const router = express.Router();

router.get("/my", requireOwnerSignIn, getOwnerBookings);
router.get("/all", requireSuperAdminSignIn, getAllBookings);
router.post("/sold/:busSlug", requireOwnerSignIn, postSold);
router.post("/book/:busslug", checkUserSignIn, postBooking);
router.patch("/:bookingId", requireOwnerSignIn, changeVerificationStatus);
router.delete("/:bookingId", requireOwnerSignIn, isBookingOwner, deleteBooking);

router.param("busSlug", busBySlug);
router.param("bookingId", bookingById);

module.exports = router;
