const mongoose = require("mongoose");
const express = require("express");
const path = require('path'); 
const config = require('./backend/Config/config.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const memberRouter = require("./backend/Routing/members.router.server.js");
const eventRouter  = require("./backend/Routing/events.router.server.js");

const port = config.port;
const app = express();

mongoose.connect(config.db.uri);
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api/member", memberRouter);
app.use("/api/event", eventRouter);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//launch our backend into a port
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

return app;
