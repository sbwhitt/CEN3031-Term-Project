const mongoose = require("mongoose");

const baseInfo = {
    discriminatorKey: '__type',
    collection: 'siteData'
};

const baseModel = mongoose.model('baseModel', new mongoose.Schema({}, baseInfo));

const profile = mongoose.model('profile', new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
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
    eventAttendedbyID: { type: Array },
    points: { type: Number }
})
);

const event = baseModel.discriminator('event', new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    points: { type: Number },
    date: { type: String },
    eventID: { type: Number }
}));

module.exports = profile;