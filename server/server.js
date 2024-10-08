const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.URI;

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const schedule = require("node-schedule");
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

//Handling db maintanence job scheduling
const populateMonth = require("./misc/populateMonth");
const deleteOldSlots = require("./misc/deleteOldSlots");

//best practice would be to assign an actual cronjob on render but they charge for it so...
function onceAMonth() {
    try {
        console.log("DB cleanup started");
        console.time("cron");
        deleteOldSlots();
        populateMonth();
        console.timeEnd("cron")
        console.log("DB cleanup completed");
    } catch (e) {
        console.log(e);
    }
}

const notifyUsersBookingTmr = require("./misc/notifyUsersBookingTmr");
function everyDay() {
    notifyUsersBookingTmr();
}
const job = schedule.scheduleJob('0 0 1 * *', onceAMonth);
const job2 = schedule.scheduleJob('0 0 * * * *' ,everyDay);


mongoose.connect(uri, {dbName: "tabs_main"}).then(() => {
    //listen for requests
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`started on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});
