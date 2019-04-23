var mongoose = require('mongoose'),
  Alumni = require('../Model/AlumniSchema.js');

exports.list = function (req, res) {
  Alumni.find((err, data) => {
    if (err) return res.json({
      success: false,
      error: err
    });
    return res.json({
      success: true,
      data: data
    });
  });
}

exports.create = function (req, res) {
  const newAlum = new Alumni(req.body);
  newAlum.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(newAlum);
    }
  });
};
