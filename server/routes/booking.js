const { getDateTimeslots } = require("../controllers/bookingsControllers");

const express = require("express");
const router = express.Router();

//make bookings route
router.post('/get_date_timeslots', getDateTimeslots);

module.exports = router;