/** @module models/Album
* The Album Model. 
* Schema:
* _id            String       required   Unique identifier of the album
* name           String       required   Name of the album
* artist         ObjectId     required   Artist who performs in this album. It should be the `_id` of an Artist model document.
* artwork        String       optional   URL of the artwork picture for the album. Default ''
* tracks         [ObjectId]   optional   Tracks that this album contains. They should be `_id`s of Track Model documents.
* dateCreated    Date         required   Date the album was created. Default: Date.now()
* dateReleased   Date         required   Date the album was released. Default: Date.now()
* label          String       optional   Record label of this album. Default: 'USI-INF records'
*/

/** @constructor
* @augments AbstractSoundCollectionSchemaInstance
* @param {Object} definition
*/
'use strict';

var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var AlbumSchema = new mongoose.Schema({
	name: {type: String, required: true},
	artist: {type: ObjectId, required: true},
	artwork: {type: String, required: false, default: ""},
	label: {type: String,required: false, default: "USI-INF records"},
	tracks: [{type: ObjectId, required: true}],
	dateCreated: {type: Date, required: true, default: Date.now},
	dateReleased: { type: Date, required: true, default: Date.now},
}
);
// Register model
mongoose.model("Album", AlbumSchema);