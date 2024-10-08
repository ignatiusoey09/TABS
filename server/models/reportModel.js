const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema);