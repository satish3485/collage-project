/** @module models/Playlist
 * The Playlist Model.
 * Schema:
 * _id           String       required   unique identifier of the playlist.
 * name          String       required   name of the playlist.
 * tracks        [ObjectId]   optional   tracks that this playlist contains. They should be `_id`s of Track model documents.
 * dateCreated   Date         required   date the playlist was created. Default: Date.now()
 */

/** @constructor
 * @param {Object} definition
 */

'use strict';


var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;


var PlaylistSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	tracks: [{
		type: ObjectId,
		required: false
	}],

	dateCreated: {
		type: Date,
		required: true,
		default: Date.now
	}
});

// registering model
mongoose.model("Playlist", PlaylistSchema);