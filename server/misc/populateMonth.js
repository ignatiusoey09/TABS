const Booking = require("../models/bookingModel");

async function populateMonth() {
    //designing a function to populate the mongo bookings collection
    //intent is to schedule this functione every month

    var today = new Date();
    var currMonth = today.getMonth();
    var currYear = today.getFullYear();

    //there is some time conversion shenanigans here as the date gets converted to UTC
    //instead of local and i cant find a good way to stop that
    const startOfMonth = new Date(currYear, currMonth, 1);
    const endOfMonth = new Date(currYear, currMonth + 2, 0);
    
    try {
        var d = startOfMonth;
        const documentsArr = [];

        while (d <= endOfMonth) {
            dateString = d.toDateString();

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

        await Booking.insertMany(documentsArr);
        console.log("Collection succesfully populated");

    } catch (e) {
        console.log(e);
    }
}

module.exports = populateMonth;