const memberController = require("../Controller/members.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/getMembers")
  .get(memberController.list);

router.route("/getMembers/sorted")
  .get(memberController.listSorted);

router.route("/profile")
  .get(memberController.getMember);

router.route("/profiles")
  .get(memberController.getMembers);

router.route("/updateMember")
  .post(memberController.update);

router.route("/:idMember")
  .get(memberController.read)
  .delete(memberController.delete)
  .put(memberController.update);

router.route("/:idMember/demote")
  .put(memberController.demoteExecutive);

router.route("/:idMember/promote")
  .put(memberController.promoteExecutive);

router.route("/createMember")
  .post(memberController.create);

router.param('idMember', memberController.memberByID);

module.exports = router;