const alumniController = require("../Controller/alumni.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/getAlumni")
  .get(alumniController.list);

router.route("/createAlumni")
  .post(alumniController.create);

module.exports = router;