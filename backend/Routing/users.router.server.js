const userController = require("../Controller/users.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/createUser")
  .post(userController.create);

module.exports = router;