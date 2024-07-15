const { getDateTimeslots, makeBooking, getBookingsByUser } = require("../controllers/bookingsControllers");
const requireAuth = require("../middleware/requireAuth");

const express = require("express");
const router = express.Router();

//use authorization middleware
router.use(requireAuth);

//get bookings by date route
router.post('/get_date_timeslots', getDateTimeslots);

//make bookings route
router.post('/make_booking', makeBooking);

//get bookings by user id route
router.post('/get_user_bookings', getBookingsByUser);

module.exports = router;