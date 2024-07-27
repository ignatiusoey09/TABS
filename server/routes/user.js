const { loginUser, registerUser, getUsers } = require("../controllers/userControllers");

const express = require('express');
const router = express.Router();

//login route
router.post('/login', loginUser);

//register route
router.post('/register', registerUser);

// get users route
router.get('/getUsers', getUsers);



module.exports = router;
