const { getDateTimeslots } = require("../controllers/bookingsControllers");
const requireAuth = require("../middleware/requireAuth");

const express = require("express");
const router = express.Router();
router.use(requireAuth);

//make bookings route
router.post('/get_date_timeslots', getDateTimeslots);

module.exports = router;