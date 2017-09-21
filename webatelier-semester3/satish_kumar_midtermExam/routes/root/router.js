/** @module users/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var rootUrl = require("../../config").url;


//supported methods
router.all('/', middleware.supportedMethods('GET, POST,OPTIONS'));

//list users
router.get('/', function(req, res, next) {
	
	for (var i = 0; i < req.rawHeaders.length; i++) {
		if(req.rawHeaders[i].localeCompare('Cookie') == 0){
			var cook = req.rawHeaders[i+1].split('=');
			var m = cook[1].split(';')
			cook.splice(1,1)
			cook.splice(1,0,m[0],m[1])
			if(cook[1] == '' || cook[3] == ''){
				// res.render('login');
				res.render('library');
				
			}
			else {
				res.render('library');
			}
		
			
			}

	};

});

router.get('/signup.html', function(req, res, next) {

  res.render('signup');

});

// router.get('/login.html', function(req, res, next) {

//   res.render('login');

// });
/** router for /users */
module.exports = router;
