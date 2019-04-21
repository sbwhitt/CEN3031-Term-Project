const mongoose = require("mongoose");

const event = mongoose.model('event', new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    points: { type: Number },
    date: { type: String },
    duration: { type: Number },
    location: { type: String },
    description: { type: String },
    attended: [String],
})
);

module.exports = event;