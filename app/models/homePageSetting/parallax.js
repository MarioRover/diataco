const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const parallaxSchema = new Schema({
  headerParallax     : { type : String},
  descParallax       : { type : String},
  parallaxImageUrl   : { type : Object},

  createdDate : {type : String},
  createdTime : {type : String}
});

parallaxSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('parallax', parallaxSchema);