const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.URI;

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();

//importing routes
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const reportRoutes = require('./routes/report');
const announcementRoutes = require('./routes/announcement');

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//routes
app.use("/api/user", upload.none(), userRoutes);
app.use("/api/booking", upload.none(), bookingRoutes);
app.use("/api/report", upload.none(), reportRoutes);
app.use("/api/announcement", upload.none(), announcementRoutes);

/**
 * RUN WITH CAUTION
 */
//const populateMonth = require("./misc/populateMonth");
//populateMonth();

mongoose.connect(uri, {dbName: "tabs_main"}).then(() => {
    //listen for requests
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`started on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});
