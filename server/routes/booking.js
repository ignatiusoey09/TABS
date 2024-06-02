const { getDateTimeslots, makeBooking } = require("../controllers/bookingsControllers");
const requireAuth = require("../middleware/requireAuth");

const express = require("express");
const router = express.Router();

//use authorization middleware
router.use(requireAuth);

//get bookings route
router.post('/get_date_timeslots', getDateTimeslots);

//make bookings route
router.post('/make_booking', makeBooking);

module.exports = router;