var mongoose = require('mongoose'),
    Event = require('../Model/EventSchema.js');

exports.list = function (req, res) {
    Event.find((err, data) => {
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

/* Retrieve all the events, sorted alphabetically by firstName */
exports.listSorted = function (req, res) {

    Event.find().sort({
      name: 'asc'
    }).exec(function (err, data) {
      if (err) {
        res.status(404).send(err);
        throw err;
      }
  
      res.json(data);
    })
  };

/* Show the current event */
exports.read = function (req, res) {
    /* send back the listing as json from the request */
    res.json(req.event);
};

exports.eventName = function (req, res, next, name) {
    console.log(name);
    Event.findOne({
        name: name
    }).exec(function (err, event) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.event = event;
            next();
        }
    });
};