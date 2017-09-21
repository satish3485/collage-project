/** @module routes/abook */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//require AddressBook model here
require('../models/Abook')
// get a reference to the model
var Abook = mongoose.model('Abook');

//add GET handler here (tasks 4, 6 and task 8)
router.get('/', function(req, res, next){

  //task6
  //create our filter for the find method
  //we build the filter by reading the query vars
  var filter = {};
  if (req.query.firstname) {
    filter.firstname = req.query.firstname;
  }
  if (req.query.lastname) {
    filter.lastname = req.query.lastname;
  }
  if (req.query.email) {
    filter.email = req.query.email;
  }
  if (req.query.homepage) {
    filter.homepage = req.query.homepage;
  }
  
  //get the filtered data from Mongodb
  Abook.find(filter, function(err, found){
  	
    if (err) throw (err);
	
	if(req.accepts("html")){
	  //Render results into HTML on the server-side
      res.render("address",{title: 'My contacts', contacts: found});
	}
    else if (req.accepts("json")) {
      //Send JSON results if the client asks for that
      res.json(found);
    }

  })
});


//add POST handler here (task 5)
router.post('/', function(req, res, next){

  //create new Abook document by parsing the POST body vars
  var myContact = new Abook({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    homepage: req.body.homepage
  });

  //save to database
  myContact.save(function(err, saved){
    if (err) throw (err);
    res.send(saved)
  });
});


//add DELETE handler here (task 7)
router.delete('/', function(req, res, next){
  //get a reference to our db model

  var filter = {};
  var keys = Object.keys(req.query);
  var allowedParameters = ["_id"];

  for (var i=0, l = keys.length; i<l; i++){
    if (allowedParameters.indexOf(keys[i]) == -1) {
      return res.status(400).end();
    }
  };

  if (keys.indexOf("_id") > -1) {
    filter._id = req.query._id;
  }

  //delete an entry
  Abook.remove(filter, function (err) {
    if (err) {
      return res.status(500).end();
    }
    res.status(204).end();
  });
});


/** router for /address */
module.exports = router;
