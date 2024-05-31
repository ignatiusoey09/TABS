const { loginUser } = require("../controllers/userControllers");

const express = require('express');
const router = express.Router();

//login route
router.post('/login', loginUser);




//register route
router.post('/register', () => {});



module.exports = router;
