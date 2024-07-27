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

const getBookingsByUser = async (req, res) => {
    //find all bookings under a specific user
    let user_id = req.body["user_id"];

    try {
        //get all bookings and iterate through
        const bookings = await Booking.find();

        var result = new Map();

        for (let i = 0; i < bookings.length; i++) {

            if (bookings.length == 0) {
                break;
            }

            let booking = bookings[i];
            let date = booking.date;
            let arr = [];
            for (let j = 0; j < booking.slots.length; j++) {
                let timeslot = booking.slots[j];
                if (timeslot.user.id == user_id) {
                    arr.push(timeslot);
                }
            }
            
            if (arr.length > 0) {
                result.set(date,arr);
            }
        }

        var obj = Object.fromEntries(result);
        res.status(200).json({bookings:obj});

    } catch (e) {
        console.log(e);
        res.status(400).json({error:e});
    }
    
}

const deleteBookingById = async (req, res) => {
    let date = req.body["date"];
    let booking_id = req.body["booking_id"];

    try {
        await Booking.findOneAndUpdate({"slots._id": booking_id}, {$set: {
            "slots.$.is_booked": false,
            "slots.$.user": null
        }});
        res.status(200).json({message: "Booking deleted successfully"});
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e});
    }
}

module.exports = { getDateTimeslots, makeBooking, getBookingsByUser, deleteBookingById };