var User = require('../Model/UserSchema.js');

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
  User.findOne(req.query, function(err, user) {
    if (err) {
      console.log("error finding user by id");
      throw err;
    }
    res.json(user);
  });
}
