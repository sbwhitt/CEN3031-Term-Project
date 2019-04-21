var Alumni = require('../Model/AlumniSchema.js');

exports.create = function (req, res) {
    var newAlumni = new Alumni(req.body);

    newUser.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log("Alumni successfully created and saved");
            return res.json(newAlumni);
        }
    });
};

exports.getAlumni = function (req, res) {
    User.findOne(req.query, function (err, alumni) {
        if (err) {
            console.log("error finding user");
            throw err;
        }
        res.json(alumni);
    });
}

/* Retrieve all the alumni, sorted alphabetically by lastName */
exports.listSorted = function (req, res) {
    Alumni.find().sort({
        lastName: 'asc'
    }).exec(function (err, data) {
        if (err) {
            res.status(404).send(err);
            throw err;
        }

        res.json(data);
    })
};

// Delete an alumni
exports.delete = function (req, res) {
    let alumni;

    Alumni.findOne(req.query).exec(function (err, alumniObj) {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log("Alumni successfully found");
            alumni = alumniObj;
        }
    });

    alumni.remove(function (err) {
        if (err) {
            console.log(err);
            res.status(404).send(err);
            throw err;
        }

        console.log("Alumni successfully removed");
        res.end();
    })
};