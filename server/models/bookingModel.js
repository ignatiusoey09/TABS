const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    date: {
        type: String,
        required: true,
        unique: true,
    },
    slots: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model("Booking", bookingSchema);