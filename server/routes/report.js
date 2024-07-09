const { createReport, getReports, resolveReport } = require("../controllers/reportControllers");
const requireAuth = require("../middleware/requireAuth");


const express = require('express')
const router = express.Router();

//router.use(requireAuth);

// get reports
router.get('/getReports', getReports);

// create new report route
router.post('/submitReport', createReport);

// resolve a report
router.delete('/resolveReport/:id', resolveReport)
module.exports = router;