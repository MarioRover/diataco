const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const homeSliderSchema = new Schema({
  homeSlideritem1     : { type : String},
  homeSlidericonItem1 : { type : String},
  homeSlideritem2     : { type : String},
  homeSlidericonItem2 : { type : String},
  homeSlideritem3     : { type : String},
  homeSlidericonItem3 : { type : String},
  homeSliderImageUrl  : { type : Object},

  createdDate : {type : String},
  createdTime : {type : String}
});

homeSliderSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('homeSlider', homeSliderSchema);