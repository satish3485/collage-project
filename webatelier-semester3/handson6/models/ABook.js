var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function toLower (v) { return v.toLowerCase() }

var AbookSchema = exports.AbookSchema = new Schema({
  firstname: { type: String },
  lastname: {type:String},
  email: {type:String, set: toLower},
  homepage: {type:String}
});

mongoose.model('Abook', AbookSchema);