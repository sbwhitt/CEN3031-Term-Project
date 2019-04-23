const userController = require("../Controller/users.server.controller.js");
const express = require("express");

const router = express.Router();

router.route("/user")
  .get(userController.findUser);

router.route("/login")
  .post(userController.login);

router.route("/decode")
  .post(userController.decode);

router.route("/createUser")
  .post(userController.create);

router.route("/deleteUser")
  .delete(userController.delete);

router.route("/updateUser")
  .post(userController.update);

module.exports = router;