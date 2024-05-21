const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();



const PORT = 8080;

//Approved credentials for now; TODO setup mongodb for actual authentication
const EMAIL = "me@gmail.com";
const PASS = "pass1234";

app.use(cors());
app.use(express.urlencoded({extended:true}));

app.post("/api/login", upload.none(), (req, res) => {
    let body  = req.body;
    console.log(body);
    let email = body["email"];
    let pass = body["password"];

    if (email == EMAIL && pass == PASS) {
        res.json({login_success: true});
    } else {
        res.json({login_success: false});
    }
})

app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
})