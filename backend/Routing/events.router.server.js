const eventController = require("../Controller/events.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/getEvents")
  .get(eventController.list);


module.exports = router;