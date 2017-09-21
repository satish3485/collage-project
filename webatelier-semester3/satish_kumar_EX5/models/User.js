/** @module users/User
* The User Model
* Schema:
* _id           ObjectId                    Unique identifier of the user
* userName      String     required         Username of the user
* email         String     required         Email address of the user
* password      String     required         Password for the user account
* firstName     String                      First name of the user. Default: username
* lastName      String                      Last name of the user. Default: username
* dateCreated   Date       required         Date the user was created.  Default: Date.now()
* playlists     [PlaylistSchema]            Playlists of the user. Default: []
*/

/** @constructor
* @param {Object} definition

*/
'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
	
	firstName:{ type: String },
	lastName:{ type: String },
	userName:{ type: String,required: true },
	email:{ type: String,required: true },
	password:{ type: String,required: true },
	dateCreated:{ type: Date, default: Date.now },
	playlists: {type: [ObjectId], ref: "Playlist", default: []},
}
);
/* Password encryption based on: http://minocys.azurewebsites.net/auth-with-mongoose*/

var SALT_WORK_FACTOR = 10;

userSchema.pre("save", function(next) {
	var user = this;

	this.firstName = user.userName;
	this.lastName = user.userName;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified("password")) {
		return next();
	}

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			return next(err);
		}

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
		})
	})
	if(this.firstName === undefined ){
 		this.firstName = this.userName;
 	}
 	if(this.lastName === undefined){
 		this.lastName = this.userName;
 	}
 	next();

})

userSchema.methods.isValidPassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {

		if (err) {
			return cb(err);
		}

		cb(null, isMatch);
	})
}

userSchema.pre('save', function(next){
 if(this.firstName === undefined ){
 this.firstName = this.userName;
 }
 if(this.lastName === undefined){
 this.lastName = this.userName;
 }
 next();
});

mongoose.model("User", userSchema);