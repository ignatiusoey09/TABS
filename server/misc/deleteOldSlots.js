const Booking = require("../models/bookingModel");

async function deleteOldSlots() {
    //delete timeslots older than 2 months
    
    const today = new Date();
    const twoMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
    console.log(twoMonthAgo);

    try {
        const timeslots = await Booking.find(); //array of dates, each with timeslot array
    
        let t_date;
        let id;
        for (let i=0; i < timeslots.length; i++) {
            t_date = new Date(timeslots[i].date);
            if (t_date < twoMonthAgo) {
                //if timeslot t is more than 1 month old
                id = timeslots[i]._id;
                await Booking.findByIdAndDelete(id);
            }
        }
    } catch (e) {
        console.log(e);
    }
    
}

module.exports = deleteOldSlots;