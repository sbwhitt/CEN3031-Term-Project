var mongoose = require('mongoose'),
  User = require('../Model/UserSchema.js');

exports.register = function (req, res) {
  var newUser = new User(req.body);

  newUser.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("User successfully created and saved");
      return res.json(newUser);
    }
  });
};

exports.login = function(req, res) {
  let user = req.user;

  User.findById({_id: user._id}, function(err, res) {
    if (err) {
      console.log("error finding user by id");
      res.stats(404).send(err);
      throw err;
    }
    return res.json({
      success: true,
      data: res
    });
  });
}
