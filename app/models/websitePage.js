const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const websiteSchema = new Schema({
  title       : { type : String , default : ''},
  desc        : { type : String , default : ''},
  background  : { type : Object , default : ''},
  tags       : { type : Array , default : ''},
} , {timestamps : true});

module.exports = mongoose.model('WebsitePage', websiteSchema);