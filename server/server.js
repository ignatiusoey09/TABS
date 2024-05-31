const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

//TODO: remove username and password from uri before pushing to production
const uri = "mongodb+srv://tabs_orbital:tempoIsGreat696@cluster0.xcjr2u9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();
const PORT = 8080;

//importing routes
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');

//middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
//routes
app.use("/api/user", upload.none(), userRoutes);

app.use(express.json());

app.use("/api/booking", bookingRoutes);

/**
 * RUN WITH CAUTION
 */
async function populateMonth() {
    //desgining a function to populate the mongodb bookings table

    var today = new Date();
    var currMonth = today.getMonth();
    var currYear = today.getFullYear();

    //there is some time conversion shenanigans here as the date gets converted to UTC
    //instead of local and i cant find a good way to stop that
    const startOfMonth = new Date(currYear, currMonth, 1);
    const endOfMonth = new Date(currYear, currMonth + 1, 0);
    
    try {
        await client.connect();
        const coll = client.db("tabs_main").collection("bookings");
        var d = startOfMonth;
        const documentsArr = [];

        while (d <= endOfMonth) {
            dateString = d.toDateString();
            console.log(dateString);

            const doc = {
                date: dateString,
                slots: [
                    {time: "8:00 AM", is_booked: false},
                    {time: "10:00 AM", is_booked: false},
                    {time: "12:00 PM", is_booked: false},
                    {time: "2:00 PM", is_booked: false},
                    {time: "4:00 PM", is_booked: false},
                    {time: "6:00 PM", is_booked: false},
                    {time: "8:00 PM", is_booked: false},
                ]
            }

            documentsArr.push(doc);
            var newDate = d.setDate(d.getDate() + 1);
            d = new Date(newDate);
        }

        await coll.insertMany(documentsArr);
        client.close();

    } catch (e) {
        console.log(e);
    }
}

//populateMonth();

mongoose.connect(uri, {dbName: "tabs_main"}).then(() => {
    //listen for requests
    app.listen(PORT, () => {
        console.log(`started on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
