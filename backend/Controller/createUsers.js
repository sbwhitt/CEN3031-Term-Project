const mongoose = require("mongoose");
const Profile = require("../Model/ProfileSchema.js");
const User = require("../Model/UserSchema.js");
const config = require('../Config/config.js');
const bcrypt = require('bcryptjs');

mongoose.connect(config.db.uri);

Profile.find((err, data) => {
    if (err) return res.json({
      success: false,
      error: err
    });
    return data;
})
.then((data) => {
    for (var i = 0; i < data.length; i++) {
        var profile = data[i];
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash("password", salt, function(err, hash) {
                var newUser = new User({
                    email: profile.email,
                    password: hash,
                });
                newUser.save(function(err) {
                    if (err) throw err;
                });     
            });
        });
    }
});
