const mongoose = require("mongoose");
const Profile = require("../Model/ProfileSchema.js");
const User = require("../Model/UserSchema.js");
const config = require('../Config/config.js');

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
        var newUser = new User({
            email: data[i].email,
            password: "password",
        });
        newUser.save(function(err) {
            if (err) throw err;
        });
    }
});
