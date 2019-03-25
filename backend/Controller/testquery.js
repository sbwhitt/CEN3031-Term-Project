const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const schema = require("../Model/schema.js");
const config = require('../Config/config.js');

var db, collection;
//connects our back end code with the database
//this works
MongoClient.connect(config.db.uri, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        throw error;
    }
    db = client.db('test');
    collection = db.collection('profile');
    console.log('connected');
    /*fs.readFile('../Datastore/MemberData.json', 'utf8', function(err, data) {
        if (err) console.log(err);
        var members = JSON.parse(data);
        collection.insertMany(members);
        console.log('finished');
    });*/
    collection.find({"firstName": "Yousef"}).toArray().then(function(items) {
        console.log(items);
    });
});
