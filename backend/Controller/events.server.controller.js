var mongoose = require('mongoose'), 
    Event = require('../Model/EventSchema.js');

exports.list = function(req, res) {
    Event.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
}