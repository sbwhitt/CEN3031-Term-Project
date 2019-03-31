const mongoose = require("mongoose");
const express = require("express");
const path = require('path'); 
const ProfileSchema = require("./backend/Model/ProfileSchema.js");
const config = require('./backend/Config/config.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();

//connects our back end code with the database
mongoose.connect(config.db.uri);
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api", router);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.get("/getMembers", (req, res) => {
  ProfileSchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//launch our backend into a port
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
