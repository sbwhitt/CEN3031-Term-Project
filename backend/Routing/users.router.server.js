const userController = require("../Controller/users.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/register")
  .post(userController.register);

router.route("/user")
  .get(userController.findUser);

router.route("/login")
  .post(userController.login);

router.route("/decode")
  .post(userController.decode);

module.exports = router;