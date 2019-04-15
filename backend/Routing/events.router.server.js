const eventController = require("../Controller/events.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/getEvents")
  .get(eventController.list);

router.route("/getEvents/sorted")
  .get(eventController.listSorted);

router.route("/:idEvent")
  .get(eventController.read);

router.param('idEvent', eventController.eventName);

router.route("/createEvent")
  .post(eventController.create);

module.exports = router;