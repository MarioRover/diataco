const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const messagesSchema = new Schema({
  fullName    : {type : String},
  email       : {type : String},
  subject     : {type : String},
  description : {type : String},
  createdDate : {type : String},
  createdTime : {type : String}
});
messagesSchema.pre('save' , function(next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()} . ${d.getMonth()} . ${d.getDate()}`;
  this.createdTime = `${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('Messages', messagesSchema);