const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const aboutPageSchema = new Schema({
  admin          : { type : Schema.Types.ObjectId , ref : 'Admin' },
  headerTitle    : {type : String , default : ''},
  headerImageUrl : {type : Object},
  descDesc      : {type : String , default : ''}, 
  item1     : {type : String , default : ''},
  Descitem1 : {type : String , default : ''},
  item2     : {type : String , default : ''},
  Descitem2 : {type : String , default : ''},
  item3     : {type : String , default : ''},
  Descitem3 : {type : String , default : ''},
  item4     : {type : String , default : ''},
  Descitem4 : {type : String , default : ''},
  item5    : {type : String , default : ''},
  Descitem5 : {type : String , default : ''},
  item6     : {type : String , default : ''},
  Descitem6 : {type : String , default : ''},
  parallaxImageUrl  : {type : Object},
} , {timestamps : true});

module.exports = mongoose.model('AboutPage', aboutPageSchema);