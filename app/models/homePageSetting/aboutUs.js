const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const aboutUsSchema = new Schema({
  aboutUsheader       : { type : String},
  aboutUsheaderDesc   : { type : String},
  aboutUsImageUrl     : { type : Object},
  createdDate : {type : String},
  createdTime : {type : String}
});

aboutUsSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('aboutUs', aboutUsSchema);