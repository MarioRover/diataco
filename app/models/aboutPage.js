const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const aboutPageSchema = new Schema({
  admin          : { type : Schema.Types.ObjectId , ref : 'Admin' },
  
  headerImageUrl : {type : Object},
  headerTitle    : {type : String},
  
  desc1ImageUrl  : {type : Object},
  desc1Desc      : {type : String}, 

  desc2ImageUrl  : {type : Object},
  desc2Desc      : {type : String},
  
  item1     : {type : String},
  Iconitem1 : {type : String},
  Descitem1 : {type : String},
  item2     : {type : String},
  Iconitem2 : {type : String},
  Descitem2 : {type : String},
  item3     : {type : String},
  Iconitem3 : {type : String},
  Descitem3 : {type : String},
  item4     : {type : String},
  Iconitem4 : {type : String},
  Descitem4 : {type : String},
  item5    : {type : String},
  Iconitem5 : {type : String},
  Descitem5 : {type : String},
  item6     : {type : String},
  Iconitem6 : {type : String},
  Descitem6 : {type : String},

  parallaxImageUrl  : {type : Object},
} , {timestamps : true});

module.exports = mongoose.model('AboutPage', aboutPageSchema);