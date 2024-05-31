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

module.exports = { getDateTimeslots, };