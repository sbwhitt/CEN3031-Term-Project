const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
    {
        name : {
            firstName: String, required: true,
            lastName: String, required: true
        },
        isActive: {type: Boolean, required: true},
        contactInfo : {
            phoneNumber : Number, 
            email       : String
        },
        studyAbroad : {
            program: String, required: true, 
            country: String
        },  
        graduationSemester: {type: String, required: true},
        yearsLeft: {type:String, required: true},
        inducted: {type:String, required:true}, 
        birthday: {type:String},     
        schoolStudy : {
            Major: Array,
            Minor: Array
        },   
        question: {type:Array, required: true},
        image: {type: String},
        officeHours: {type: String},   
        privileges : {
            isAdmin: Boolean, required: true, 
            isExecutive: Boolean, required: true
        },
        eventAttendedbyID: {type:Array},
        points : {type: Number}
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("profileSchema", profileSchema);