const eventController = require("../Controller/events.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/createEvent")
  .post(eventController.create);

router.route("/getEvents")
  .get(eventController.list);

router.route("/getEvents/sorted")
  .get(eventController.listSorted);

router.route("/:idEvent")
  .get(eventController.read)
  .delete(eventController.delete)
  .put(eventController.update);

router.param('idEvent', eventController.eventName);

module.exports = router;