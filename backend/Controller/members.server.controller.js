var mongoose = require('mongoose'), 
    Member = require('../models/schema.js');

/* Create a member */
exports.create = function(req, res) {

    /* Instantiate a Member */
    var member = new Member(req.body);
  
  
    /* Then save the member */
    member.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(member);
      }
    });
  };

  /* Show the current member */
exports.read = function(req, res) {
    /* send back the listing as json from the request */
    res.json(req.member);
  };

  /* Update a listing */
exports.update = function(req, res) {
    var member = req.member;
  
    /** TODO **/
    /* Replace the article's properties with the new properties found in req.body */
    /* Save the article */
      member.firstname           = req.body.firstname;
      member.lastname            = req.body.lastname;
      member.isActive            = req.body.isActive;
      member.phoneNumber         = req.body.phoneNumber;
      member.email               = req.body.email;
      member.programs            = req.body.programs;
      member.country             = req.body.country;
      member.graduationSemester  = req.body.graduationSemester;
      member.yearsLeft           = req.body.yearsLeft;
      member.inducted            = req.body.inducted;
      member.birthday            = req.body.birthday;
      member.majors              = req.body.majors;
      member.minors              = req.body.minors;
      member.questions           = req.body.questions;
      member.image               = req.body.image;
      member.officeHours         = req.body.officeHours;
      member.isAdmin             = req.body.isAdmin;
      member.isExecutive         = req.body.isExecutive;
      member.eventAttendedbyId   = req.body.eventAttendedbyId;
      member.points              = req.body.points;
  
      member.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(member);
        }
      });
  
  };

  // Delete a listing
  exports.delete = function(req, res) {
    var member = req.member;

    member.remove(function(err){
      if(err){
        console.log(err);
        res.status(404).send(err); 
        throw err;
      }
  
      console.log("Member successfully removed");
      res.end();
    })
  };

  /* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
 
  Member.find().sort({code: 'asc'}).exec(function(err, data){
    if(err){
      res.status(404).send(err);
      throw err;
    }

    res.json(data);
  })
};