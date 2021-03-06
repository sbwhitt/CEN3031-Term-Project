const mongoose = require("mongoose");

const alumni = mongoose.model('alumni', new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    firstLast: { type: String },
    isActive: { type: Boolean },
    phoneNumber: { type: Number },
    email: { type: String },
    programs: { type: String },
    country: { type: String },
    graduationSemester: { type: String },
    yearsLeft: { type: String },
    inducted: { type: String },
    birthday: { type: String },
    majors: [String],
    minors: [String],
    questions: { type: Array },
    image: { type: String },
    officeHours: { type: String },
    isAdmin: { type: Boolean, default: false },
    isExecutive: { type: Boolean, default: false },
    toAttend: { type: Array },
    points: { type: Number },
    removedAt: {type: Number, default: Date.now}
})
);

module.exports = alumni;