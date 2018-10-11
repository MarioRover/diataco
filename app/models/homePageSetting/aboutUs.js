const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const aboutUsSchema = new Schema({
  aboutUsheader       : { type : String},
  aboutUsheaderDesc   : { type : String},
  aboutUsImageUrl     : { type : Object}
} , {timestamps : true});

module.exports = mongoose.model('aboutUs', aboutUsSchema);