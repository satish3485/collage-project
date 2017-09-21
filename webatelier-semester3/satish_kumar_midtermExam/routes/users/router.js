/** @module users/router */
'use strict';

var express = require('express');
var router = express.Router();
var middleware =  require('../middleware');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = mongoose.model('User');
var config = require("../../config");
var pubsub = require('../../pubsub');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
//fields we don't want to show to the client
var fieldsFilter = { 'password': 0, '__v': 0 };

//supported methods
router.all('/:userids', middleware.supportedMethods('GET, PUT, DELETE, POST,OPTIONS'));
router.all('/:userid/playlist', middleware.supportedMethods('GET, PUT, DELETE, POST,OPTIONS'));
router.all('/newUser', middleware.supportedMethods('GET, PUT,POST OPTIONS'));
router.all('/Checker/:userName', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid/mode/:id', middleware.supportedMethods('PUT, OPTIONS'));
router.all('/:userid/Activity/:id', middleware.supportedMethods('DELETE, OPTIONS'));
router.all('/:userid/Activity', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid/playlists', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid', middleware.supportedMethods('GET, PUT, DELETE, POST,OPTIONS'));
router.all('/', middleware.supportedMethods('GET, POST, OPTIONS'));
router.all('/:userid/playlists/:playlistsid', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid/playlists/:playlistsid/changeOrder', middleware.supportedMethods('GET, PUT, OPTIONS'));
router.all('/:userid/playlists/:playlistsid/dragAndDrop', middleware.supportedMethods('GET, PUT, OPTIONS'));
//list users
router.get('/', function(req, res, next) {
  
  User.find({}, fieldsFilter).lean().exec(function(err, users){
    if (err) return next (err);
    users.forEach(function(user){
      addLinks(user);
    });

    res.json(users);
  });
});
router.put('/Checker/:userName', function(req, res, next) {
  var data = req.body;
 
  User.findOne({ userName: data.username }, function(err, user) {
    if (err) throw err;
    if(!user){
      return
    }
        user.isValidPassword(data.passwords, function(err, isMatch){
                
                res.json({username: user.userName,_id : user._id,redirec: isMatch})
            })
      })
  
});
   // if (!user.isModified('password')) { return next(); }
    //  var hash = '$2a$10$l34DFODZ3tlcg1DLc3XlNOrottGyWvuNhGc1Yrqu1eprMK0paOu8u';
    // var rr = bcrypt.compareSync(user.password, hash);
    // console.log(rr)
    // console.log('hash========',hash);

router.put('/:userid/mode', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      pubsub.emit('go-back-n', {});
      return;
    }
    user.mode = data.mode;
    user.save(onModelSave(res));
    pubsub.emit('mode-change', {});
    
  });

  });
//create new user
router.post('/', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(onModelSave(res, 201, true));
});

//get a user
router.get('/:userid', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter).lean().exec(function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    addLinks(user);
    res.json(user);
  });
});
router.get('/:userid/playlist', function(req, res, next) {
 
  User.findById(req.params.userid, fieldsFilter).lean().exec(function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      pubsub.emit('go-back-n', {});
      return;
    }
    addLinks(user);
    res.json(user.playlists);
  });
});
//update a user
router.put('/:userid', function(req, res, next) {
  var data = req.body;
  
  User.findById(req.params.userid, fieldsFilter , function(err, user){

    if (err) return next (err);
    if (user){

      user.userName = data.userName;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.email = data.email;
      user.playlists = data.playlists;
      user.Activity = data.Activity;
      user.save(onModelSave(res));
    }else{
      //user does not exist create it
     
      var newUser = new User(data);
      
      newUser._id = ObjectId(req.params.userid);
      newUser.save(onModelSave(res, 201, true));
    }
  });
});
// router.post('/newUser', function(req, res, next) {
//   var data = req.body;
//   console.log(data)
//     if (!data.isModified('password')) { return next(); }

//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//       if (err) { return next(err); }

//       bcrypt.hash(data.password, salt, function(err, hash) {
//           if (err) { return next(err); }

//           data.password = hash;
//           next();
//       });
//   });
//     console.log(data)
//       var newUser = new User(data);
      
//       newUser._id = ObjectId(req.params.userid);
//       newUser.save(onModelSave(res, 201, true));
 
// });
//put activity
router.put('/:userid/Activity', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      pubsub.emit('go-back-n', {});
      return;
    }
    if (!user.Activity) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }

      //track does not exist create it
      user.Activity.splice(0, 0,data);
      user.save(onModelSave(res));
      
    
  });

  });
// router.put('/newUser', function(req, res, next) {

//   var data = req.body;
//   //   if (err) return next (err);
//   //   console.log(data);

//   //     //track does not exist create it
//   //     // user.Activity.splice(0, 0,data);
//        var newUser = new User(data);
//         newUser._id = ObjectId(data._id);
//        newUser.save(onModelSave(res, 201, true));
      
    


//   });
router.delete('/:userid/Activity/:id', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    for (var i = 0; i < user.Activity.length; i++) {
       if(user.Activity[i]._id == req.params.id){
          user.Activity.splice(i, 1);
    }
       }
    
    user.save(onModelSave(res));
    pubsub.emit('Activity.Delete', {});
  });
});
router.get('/:userid/Activity', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    if (!user.Activity) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }

      //track does not exist create it
      res.json(user.Activity);
    
  });

  });
//remove a user
router.delete('/:userid', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    user.remove(function(err, removed){
      if (err) return next (err);
      res.status(204).end();
    })
  });
});

//get a user's playlists
router.get('/:userid/playlists', function(req, res, next) {
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      pubsub.emit('go-back-n', {});
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });

      return;
    }
    res.json(user.playlists);
    
  });
});

//update a user's playlists
router.put('/:userid/playlists', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    user.playlists.push(req.body);
    user.save(onModelSave(res));
  
  });
});
router.put('/:userid/playlists/:playlistsid', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    for (var i = 0; i < user.playlists.length; i++) {
     
      if(user.playlists[i].specialId == data.playlistId || user.playlists[i]._id == data.playlistId){
          if(user.playlists[i].tracks.indexOf(data.tracks) == -1){
                user.playlists[i].tracks.push(data.tracks)
            }
            
          if(data.name){
            
            user.playlists[i]["name"] = data.name;
          }
          }
        
    };

    user.save(onModelSave(res));
    // pubsub.emit('name-change', {});
  
  })
  }); 
router.put('/:userid/playlists/:playlistsid/changeOrder', function(req, res, next) {
  var data = req.body;
   
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    for (var i = 0; i < user.playlists.length; i++) {
      if(user.playlists[i].specialId == data.trackId || user.playlists[i]._id == data.trackId){
        
          for (var j = 0; j < user.playlists[i].tracks.length; j++) {
              if(user.playlists[i].tracks[j] == data.trackNumber){
                
                  var ter = user.playlists[i].tracks[j];
                  user.playlists[i].tracks.splice(j, 1)
                  }
                      
                };
                 // console.log(user.playlists[i].tracks);
                user.playlists[i].tracks.splice(data.position, 0, ter);
                // console.log(user.playlists[i].tracks);
          }

        
    };
    user.save(onModelSave(res));
    pubsub.emit('track.changeOrder', {});
  
  })
  }); 
router.put('/:userid/playlists/:playlistsid/dragAndDrop', function(req, res, next) {
  var data = req.body;
   
  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    //console.log('=================',user.playlists,'====================')
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
    for (var i = 0; i < user.playlists.length; i++) {
      if(user.playlists[i].specialId == data.trackId || user.playlists[i]._id == data.trackId){
         
          for (var j = 0; j < user.playlists[i].tracks.length; j++) {
            if(user.playlists[i].tracks[j] == data.tracks){
            	user.playlists[i].tracks.splice(j, 1);
            	user.playlists[i].tracks.splice(j, 0, data.playlistId);
            	//user.playlists[i].tracks.splice(j+1, 0, data.tracks);
                //user.playlists[i].tracks[j] = data.playlistId;
                //j++;
                
              }
            else if(user.playlists[i].tracks[j] == data.playlistId){
            	user.playlists[i].tracks.splice(j, 1)
            
            	user.playlists[i].tracks.splice(j, 0, data.tracks);
                //user.playlists[i].tracks[j] = data.tracks;

            }
            //console.log(user.playlists[i].tracks)

        };
      }
     

}

    

    
    user.save(onModelSave(res));
    //console.log(user.playlists)
    pubsub.emit('track.changeOrder', {});
  
  })
  }); 
router.get('/:userid/playlists/:playlistsid', function(req, res, next) {
  var data = req.body;

  User.findById(req.params.userid, fieldsFilter , function(err, user){
    if (err) return next (err);
    if (!user) {
      res.status(404);
      res.json({
        statusCode: 404,
        message: "Not Found"
      });
      return;
    }
   
    for (var i = 0; i < user.playlists.length; i++) {
      
      // console.log(user.playlists[i].specialId,'-----------',req.params.playlistsid)
      if(user.playlists[i].specialId == req.params.playlistsid || user.playlists[i]._id == req.params.playlistsid){
          for (var j = 0; j < user.playlists[i].tracks.length; j++) {
            if(user.playlists[i].tracks[j] == null){
              user.playlists[i].tracks.splice(j,1);
            }
          };
          res.json(user.playlists[i].tracks);
      }
      
      }
    
  
  })
  });
  


function onModelSave(res, status, sendItAsResponse){
 
  var statusCode = status || 204;
  var sendItAsResponse = sendItAsResponse || false;
  return function(err, saved){
    if (err) {
      if (err.name === 'ValidationError' 
        || err.name === 'TypeError' ) {
        res.status(400)
        return res.json({
          statusCode: 400,
          message: "Bad Request"
        });
      }else{
      	
        return next (err);
      }
    }
    pubsub.emit('track.changeOrder', {});
    pubsub.emit('Activity.Delete', {});
    if( sendItAsResponse){
      var obj = saved.toObject();
      delete obj.password;
      delete obj.__v;
      addLinks(obj);
      
      return res.status(statusCode).json(obj);
  }else{
  	
    return res.status(statusCode).end();
  }
  }
}

function addLinks(user){
  user.links = [
    { 
      "rel" : "self",
      "href" : config.url + "/users/" + user._id
    },
    { 
      "rel" : "playlists",
      "href" : config.url + "/users/" + user._id + "/playlists"
    }
  ];
}

/** router for /users */
module.exports = router;
