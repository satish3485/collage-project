/** @module models/Activity
* The Activity Model.
* Schema:
* timestamp of the event (timestamp)
- UI action performed by the user (action)
- target object of the action (target)
* 
* dateCreated   Date         required   date the playlist was created. Default: Date.now()
*/

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


/** @constructor
* @param {Object} definition
*/
var ActivitySchema = new mongoose.Schema(
  {
    Action : { type: String, required: true },
    target : { type: String, default: "" },
    timestamp : { type: Date, default: Date.now },
    _id  : { type: String, required: true },
    name : { type: String, required: true },
  }

);


//register model

mongoose.model('Activity', ActivitySchema);
module.exports = ActivitySchema;
