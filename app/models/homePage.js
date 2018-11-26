const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const homePage = new Schema({
  homeSlideritem1     : { type : String , default : ''},
  homeSlidericonItem1 : { type : String , default : ''},
  homeSlideritem2     : { type : String , default : ''},
  homeSlidericonItem2 : { type : String , default : ''},
  homeSlideritem3     : { type : String , default : ''},
  homeSlidericonItem3 : { type : String , default : ''},
  homeSliderImageUrl  : { type : Object},

  aboutUsheader       : { type : String , default : ''},
  aboutUsheaderDesc   : { type : String , default : ''},
  aboutUsImageUrl     : { type : Object},

  abilityitem1       : { type : String , default : ''},
  abilityDescitem1   : { type : String , default : ''},
  abilityitem2       : { type : String , default : ''},
  abilityDescitem2   : { type : String , default : ''},
  abilityitem3       : { type : String , default : ''},
  abilityDescitem3   : { type : String , default : ''},
  abilityitem4       : { type : String , default : ''},
  abilityDescitem4   : { type : String , default : ''},
  abilityitem5       : { type : String , default : ''},
  abilityDescitem5   : { type : String , default : ''},
  abilityitem6       : { type : String , default : ''},
  abilityDescitem6   : { type : String , default : ''},

  headerParallax     : { type : String , default : ''},
  descParallax       : { type : String , default : ''},
  parallaxImageUrl   : { type : Object},

  tags       : { type : Array , default : ''}
} , {timestamps : true});



module.exports = mongoose.model('homePage', homePage);