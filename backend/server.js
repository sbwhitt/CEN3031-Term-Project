const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const schema = require("./schema.js");

const port = 3001;
const app = express();
const router = express.Router();

//TODO add mongodb URL
const dbUrl = "";

//connects our back end code with the database
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

//checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//(optional) only made for logging and
//bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//append /api for our http requests
app.use("/api", router);

//launch our backend into a port
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
