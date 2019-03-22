const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
    {
        name : {
            firstName: String, required: true,
            lastName: String, required: true
        },
        isActive: {type: Boolean, required: true},
        email: {type: String}, 
        schoolStudy : {
            Major: Array,
            Minor: Array
        }, 
        studyAbroad : {
            program: Array, required: true, 
            country: Array
        },
        graduation: {type: String, required: true}, 
        yearsLeft: {type:String, required: true}, 
        inducted: {type:String, required:true}, 
        birthday: {type:String}, 
        question: {type:Array, required: true}
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("profileSchema", profileSchema);