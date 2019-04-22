var mongoose = require('mongoose'),
    Event = require('../Model/EventSchema.js');

/* Create an event */
exports.create = function (req, res) {

  /* Instantiate an Event */
  var newEvent = new Event(req.body);

  /* Then save the event */
  newEvent.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("Event successfully created and saved");
      res.json(newEvent);
    }
  });
};

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

exports.create = function (req, res) {
  var newEvent = new Event(req.body);
  newEvent.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("Event successfully created and saved");
      res.json(newEvent);
    }
  });
};

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

/* Update an event */
exports.update = function (req, res) {
  Event.findOneAndUpdate({_id: req.body.id}, req.body.update, function(err) {
    if (err) throw err;
  });
};

// Delete an event
exports.delete = function (req, res) {
  Event.findOneAndDelete(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
      throw err;
    }
    res.end();
  });
};

exports.eventByID = function (req, res) {
    Event.findOne(req.query, function (err, event) {
      if (err) {
        res.status(400).send(err);
    } else {
      res.json(event);
    }
    });
};