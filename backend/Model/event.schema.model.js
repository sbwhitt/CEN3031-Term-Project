const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        event : {
            name: String, required:true, 
            category: String, required:true, 
            points: String, required: true
        }
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("eventSchema", eventSchema);