const eventController = require("../Controller/events.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/createEvent")
  .post(eventController.create);

router.route("/getEvents")
  .get(eventController.list);

router.route("/getEvent")
  .get(eventController.eventByID);

router.route("/getEvents/sorted")
  .get(eventController.listSorted);

router.route("/:idEvent")
  .get(eventController.read)
  .delete(eventController.delete)
  .put(eventController.update);

router.param('idEvent', eventController.eventByID);

router.route("/createEvent")
  .post(eventController.create);

router.route("/updateEvent")
  .post(eventController.update);

module.exports = router;