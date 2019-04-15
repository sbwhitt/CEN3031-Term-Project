var mongoose = require('mongoose'),
  User = require('../Model/UserSchema.js');

exports.create = function (req, res) {
  var newUser = new User(req.body);

  newUser.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("User successfully created and saved");
      res.json(newUser);
    }
  });
};
