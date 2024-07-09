const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcementSchema);