const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
    //TODO add database schema specification here
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Schema", DataSchema);
