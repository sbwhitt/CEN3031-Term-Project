const mongoose = require("mongoose");
const fs = require('fs');
const Profile = require("../Model/schema.js");
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
