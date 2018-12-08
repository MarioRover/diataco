const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const blogPageSchema = new Schema({
  admin    : { type : Schema.Types.ObjectId , ref : 'Admin' },
  title    : { type : String , default : '' },
  imageUrl : { type : Object },
  descTags : { type : String , default : ''},
  keyTags  : { type : String , default : ''}
} , {timestamps : true});

module.exports = mongoose.model('blogPage', blogPageSchema);