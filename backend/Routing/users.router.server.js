const userController = require("../Controller/users.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/register")
  .post(userController.register);

router.route("/user")
  .get(userController.findUser);

module.exports = router;