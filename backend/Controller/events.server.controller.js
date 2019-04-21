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
    var event = req.event;
  
    Event.findOneAndUpdate({
      _id: event._id
    }, {
      "name": req.body.name,
      "category": req.body.category,
      "points": req.body.points,
      "date": req.body.date,
      "duration": req.body.duration,
      "location": req.body.location,
      "description": req.body.description,
      "attended": req.body.attended
    }, (function (err, res) {
      if (err) {
        console.log("error incoming!");
        res.stats(404).send(err);
        throw err;
      }
      console.log("Event updated");
    }))
  
    event.save(function (err) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(event);
      }
    });
  
  };

// Delete an event
exports.delete = function (req, res) {
    let event = req.event;
  
    event.remove(function (err) {
      if (err) {
        console.log(err);
        res.status(404).send(err);
        throw err;
      }
  
      console.log("Event successfully removed");
      res.end();
    })
  };

exports.eventByID = function (req, res) {
    console.log(req.query);
    Event.findOne(req.query, function (err, event) {
      if (err) {
        res.status(400).send(err);
    } else {
      res.json(event);
    }
    });
};