const mongoose = require("mongoose");
const express = require("express");
const schema = require("./schema.js");

const port = 3001;
const app = express();
const router = express.Router();

//TODO hide mongodb conection information
const dbUrl = "mongodb://swe_dev_user:devAdmin123@ds042138.mlab.com:42138/swe_studyabroad_datastore";

//connects our back end code with the database
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/*database post, put, delete, etc. functions will be implemented here

*/

//append /api for our http requests
app.use("/api", router);

//launch our backend into a port
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
