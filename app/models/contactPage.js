const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const contactPageSchema = new Schema({
  address     : { type : String , default : ''},
  iconAddress : { type : String , default : ''},
  email       : { type : String , default : ''},
  iconEmail   : { type : String , default : ''},
  telephone   : { type : String , default : ''},
  iconTelephone : { type : String , default : ''},
  imageUrl      : { type : Object},
  descTags       : { type : String , default : ''},
  keyTags       : { type : String , default : ''}
} , {timestamps : true});

module.exports = mongoose.model('contactPage', contactPageSchema);