const mongoose = require("mongoose");

const user = mongoose.model('user', new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    isExecutive: {type: Boolean, required: true, default: false},
    date: {type: Date, default: Date.now},
})
);

module.exports = user;