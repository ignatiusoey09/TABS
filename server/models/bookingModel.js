const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timeslotSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    is_booked: {
        type: Boolean,
        required: true
    },
    user: {
        email: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
        },
        role: {
            type: String,
        }
    }
});

const bookingSchema = new Schema({
    date: {
        type: String,
        required: true,
        unique: true,
    },
    slots: {
        type: [timeslotSchema],
        required: true,
    }
});

module.exports = mongoose.model("Booking", bookingSchema);