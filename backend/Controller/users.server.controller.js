var User = require('../Model/UserSchema.js');
const jwt = require('jsonwebtoken');
const config = require('../Config/config.js');

exports.create = function (req, res) {
  var newUser = new User(req.body);
  newUser.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      return res.json(newUser);
    }
  });
};

exports.findUser = function(req, res) {
  User.findOne(req.query, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

exports.login = function(req, res) {
  const payload = req.body;
  var token = jwt.sign(payload, config.secret, {expiresIn: 86400});
  res.json({
    success: true,
    token: token
  });
}

exports.decode = function(req, res) {
  if (req.body.token) {
    const token = req.body.token;
    jwt.verify(token, config.secret, {ignoreExpiration: true}, function(err, decoded) {
      if (err) throw err;
      else {
        res.json({
          success: true,
          data: decoded,
        });
      }
    });
  }
}

exports.delete = function (req, res) {
  User.findOneAndDelete(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
      throw err;
    }
    res.end();
  });
};
