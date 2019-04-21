const mongoose = require("mongoose");
const fs = require('fs');
const Profile = require("../Model/ProfileSchema.js");
const Event = require("../Model/EventSchema.js");
const config = require('../Config/config.js');

//connects our back end code with the database
mongoose.connect(config.db.uri);

fs.readFile('../Datastore/MemberData.json', 'utf8', function(err, data) {
  if (err) console.log(err);
  var members = JSON.parse(data);
  for (let i = 0; i < members.length; i++) {
    var prof = new Profile(members[i]);
    prof.save(function(err) {
      if (err) throw err;
    });
  }
  console.log('finished');
});

/*fs.readFile('../Datastore/EventData.json', 'utf8', function(err, data) {
  if (err) console.log(err);
  var events = JSON.parse(data);
  for (let i = 0; i < events.length; i++) {
    var event = new Event(events[i]);
    event.save(function(err) {
      if (err) throw err;
    });
  }
  console.log('finished');
});*/
