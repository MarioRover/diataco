const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   
const mongoosePaginate = require('mongoose-paginate');

const messagesSchema = new Schema({
  fullName    : {type : String},
  email       : {type : String},
  subject     : {type : String},
  description : {type : String}
} , { timestamps : true });
messagesSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Messages', messagesSchema);