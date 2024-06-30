const { createReport } = require("../controllers/reportControllers");
const requireAuth = require("../middleware/requireAuth");


const express = require('express')
const router = express.Router();

//router.use(requireAuth);

// create new report route
router.post('/submitReport', createReport);

module.exports = router;