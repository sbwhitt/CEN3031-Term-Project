const mongoose = require("mongoose");

const alumni = mongoose.model('alumni', new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    dateInducted: {
        type: Date
    },
}));

module.exports = alumni;