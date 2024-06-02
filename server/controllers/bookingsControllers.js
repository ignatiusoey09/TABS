const Booking = require("../models/bookingModel");

const getDateTimeslots = async (req, res) => {
    let query_date = req.body["date"];
    console.log(query_date);

    try {
        /*await client.connect();
        const result = await client.db("tabs_main").collection("bookings")
            .findOne({date: query_date});
        client.close();
        */
        
        const result = await Booking.findOne({date: query_date});
        console.log(result);
        if (result != null) {
            res.json({timeslots: result["slots"]});
        } else {
            res.json({timeslots: []});
        }

    } catch (e) {
        console.log("error querying database (Booking)");
        console.log(e);
    }
}

const makeBooking = async (req, res) => {
    let query_date = req.body["date"];
    let query_time = req.body["time"];

    try {
        const timeslot_array = await Booking.findOne({date: query_date});

        //occurs if populateMonth function has not been run yet
        if (timeslot_array == null) {
            throw new Error("timeslots not out yet");
        }

        for (ts in timeslot_array) {
            if (ts["time"] == query_time) {
                if (ts["is_booked"]) {
                    throw new Error("timeslot already booked");
                } else {
                    await Booking.findOneAndUpdate({"slots._id":ts._id}, {$set: {"slots.$.is_booked": true}});
                    res.status(200).json({status: "successful"});
                }
            }
        }


    } catch (e) {
        console.log(e);
        res.status(400).json({error: e});
    }
}

module.exports = { getDateTimeslots, makeBooking };