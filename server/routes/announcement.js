const { getAnnouncements,
    getSingleAnnouncement, 
    createAnnouncement, 
    deleteAnnouncement, 
    updateAnnouncement } = require("../controllers/announcementsControllers");

const requireAuth = require("../middleware/requireAuth");


const express = require('express')
const router = express.Router();

router.use(requireAuth);

// get announcements route
router.get('/getAnnouncements', getAnnouncements);

// get single announcement route
router.get('/getSingleAnnouncement/:id', getSingleAnnouncement)

// upload announcements route
router.post('/createAnnouncement', createAnnouncement)

// delete an announement
router.delete('/deleteAnnouncement/:id', deleteAnnouncement)

// update an announcement
router.patch('/updateAnnouncement/:id', updateAnnouncement)

module.exports = router;