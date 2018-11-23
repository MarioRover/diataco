const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const siteInfoSchema = new Schema({
  updateBy    : { type : Schema.Types.ObjectId , ref : 'Admin' },
  nameEn      : {type : String , default : 'Diata'},
  nameFa      : {type : String , default : 'دیاتا'},
  logo        : {type : Object , default : ''},
  telegram    : {type : String , default : ''},
  whatsapp    : {type : String , default : ''},
  instagram   : {type : String , default : ''},
  facebook    : {type : String , default : ''},
  linkedin    : {type : String , default : ''},
  version     : {type : String , default : ''},
  debug       : {type : Boolean , default : false}
} , {timestamps : true});


module.exports = mongoose.model('SiteInfo', siteInfoSchema);