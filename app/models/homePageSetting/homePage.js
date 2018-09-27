const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const homePageSchema = new Schema({
  homeSlideritem1     : { type : String},
  homeSlidericonItem1 : { type : String},
  homeSlideritem2     : { type : String},
  homeSlidericonItem2 : { type : String},
  homeSlideritem3     : { type : String},
  homeSlidericonItem3 : { type : String},
  homeSliderImageUrl  : { type : Object},

  aboutUsheader       : { type : String},
  aboutUsheaderDesc   : { type : String},
  aboutUsImageUrl     : { type : Object},

  abilityitem1       : { type : String},
  abilityIconitem1   : { type : String},
  abilityDescitem1   : { type : String},
  abilityitem2       : { type : String},
  abilityIconitem2   : { type : String},
  abilityDescitem2   : { type : String},
  abilityitem3       : { type : String},
  abilityIconitem3   : { type : String},
  abilityDescitem3   : { type : String},
  abilityitem4       : { type : String},
  abilityIconitem4   : { type : String},
  abilityDescitem4   : { type : String},
  abilityitem5       : { type : String},
  abilityIconitem5   : { type : String},
  abilityDescitem5   : { type : String},
  abilityitem6       : { type : String},
  abilityIconitem6   : { type : String},
  abilityDescitem6   : { type : String},

  headerParallax     : { type : String},
  descParallax       : { type : String},
  parallaxImageUrl   : { type : Object},


  createdDate : {type : String},
  createdTime : {type : String}
});

homePageSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('homePage', homePageSchema);