const Booking = require("../models/bookingModel");

const getDateTimeslots = async (req, res) => {
    let query_date = req.body["date"];
    console.log(query_date);

    try {
        const result = await Booking.findOne({date: query_date});
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
    let user = req.body["user"]; 

    try {
        //retrieve booking document
        const booking = await Booking.findOne({date: query_date});

        //occurs if populateMonth function has not been run yet
        if (booking == null) {
            throw new Error("timeslots not out yet");
        }

        var found = false;

        for (i = 0; i < booking["slots"].length; i++) {
            let ts = booking["slots"][i];
            if (ts["time"] == query_time) {
                found = true;

                if(ts["is_booked"]) {
                    throw new Error("This timeslot is already booked");
                } else {
                    ts["is_booked"] = true;
                    ts["user"] = user;
                    await booking.save();
                    res.status(200).json({status: "success"});
                    break;
                }
            }
        }

        if (!found) {
            throw new Error("Date is populated but invalid query time");
        }

        
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

module.exports = { getDateTimeslots, makeBooking };