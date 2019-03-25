'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    profileSchema = require('../Model/profile.schema.model.js'),
    eventSchema = require('../Model/event.schema.model.js'),
    config = require('../Config/config.js'),
    cominedMembersJson = require('../Datastore/combinedMembers.json'),
    eventAttendanceJson = require('../Datastore/EventAttendanceSpring2019.json'),
    pointsSpringJson = require('../Datastore/PointsSpring2019.json');

/* Connect to your database */

mongoose.connect(config.db.uri, { useMongoClient : true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); //potential error here

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

for(var member in cominedMembersJson.entries){  //iterate through all the listings in
  var memberToAdd = new member(combinedMembersJson.member);

  listingToAdd.save(function (err, memberToAdd) 
    { 
      console.log(memberToAdd);
      if (err) console.log ('Error on save! File Source: ./JSONtoMongo.js');
    }
  );
}

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */