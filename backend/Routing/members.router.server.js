const memberController = require("../Controller/members.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/getMembers")
  .get(memberController.list);

router.route("/createMember").post(memberController.create);

module.exports = router;
