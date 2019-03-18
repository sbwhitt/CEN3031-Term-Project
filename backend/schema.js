const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const userSchema = new Schema(
    //TODO add database schema specification here
    {
        name : {
            firstName: String, required: true,
            lastName: String, required: true
        },
        isAdmin : {type: Boolean, required: true},
        studyAbroadProgram : {type: String, required: true},
        contactInfo : {
            phoneNumber : Number, 
            email       : String
        },
        points  : {type: Number}
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("userSchema", userSchema);
