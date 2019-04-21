const alumniController = require("../Controller/alumni.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/createAlumni")
    .post(alumniController.create);

router.route("/getAlumni/list")
    .get(alumniController.listSorted);

router.route("/getAlumni")
    .get(alumniController.update)
    .delete(alumniController.delete);


module.exports = router;