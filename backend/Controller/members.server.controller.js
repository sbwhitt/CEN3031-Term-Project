var mongoose = require('mongoose'),
  Member = require('../Model/ProfileSchema.js');

/* Create a member */
exports.create = function (req, res) {
  const newMember = new Member(req.body);
  newMember.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(newMember);
    }
  });
};

/* Show the current member */
exports.read = function (req, res) {
  /* send back the listing as json from the request */
  res.json(req.member);
};

/* Update a member */
exports.update = function (req, res) {
  Member.findOneAndUpdate({_id: req.body.id}, req.body.update, function (err, member) {
    if (err) {
      res.stats(404).send(err);
      throw err;
    }
    res.json(member);
  });
};

// Delete a member
exports.delete = function (req, res) {
  Member.findOneAndDelete(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(404).send(err);
      throw err;
    }
    res.end();
  });
};

/* Retrieve all the members, sorted alphabetically by firstName */
exports.listSorted = function (req, res) {

  Member.find().sort({
    lastName: 'asc'
  }).exec(function (err, data) {
    if (err) {
      res.status(404).send(err);
      throw err;
    }

    res.json(data);
  })
};

//Retrieve all members without sort
exports.list = function (req, res) {
  Member.find((err, data) => {
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

//Change the permissions of a member to executive
exports.promoteExecutive = function (req, res) {
  console.log("Entered the promote executive");
  let member = req.member;

  Member.findOneAndUpdate({
    _id: member._id
  }, {
    "isExecutive": true
  }, (function (err, res) {
    if (err) {
      console.log("error incoming!");
      res.stats(404).send(err);
      throw err;
    }
    console.log("Member promoted to Executive");
  }))

  member.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log("Promoted member successfully saved");
      res.json(member);
    }
  });
};

//Change the permissions of an executive to member
exports.demoteExecutive = function (req, res) {
  let member = req.member;

  Member.findOneAndUpdate({
    _id: member._id
  }, {
    "isExecutive": false
  }, (function (err, res) {
    if (err) {
      res.stats(404).send(err);
      throw err;
    }
    console.log("Executive demoted to member");
  }))

  member.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(member);
    }
  });
};

exports.memberByID = function (req, res, next, _id) {
  // console.log(firstLast);
  Member.findOne({
    _id: _id
  }).exec(function (err, member) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.member = member;
      next();
    }
  });
};

exports.getMember = function(req, res) {
  Member.findOne(req.query, function(err, member) {
    if (err) {
      res.status(400).send(err);
    }
    else res.json(member);
  });
}

exports.getMembers = function(req, res) {
  Member.find({email: {$in: req.query.attended}}, function(err, members) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.json(members);
    }
  });
}
