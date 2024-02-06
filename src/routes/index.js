const express = require("express");

const router = express.Router();
const bookingRoutes = require("./v1/booking-route");

router.use("/bookings", bookingRoutes);

module.exports = router;
