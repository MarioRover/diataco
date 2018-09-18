const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const contactPageSchema = new Schema({
  address     : { type : String},
  iconAddress : { type : String},
  email       : { type : String},
  iconEmail   : { type : String},
  telephone   : { type : String},
  iconTelephone : { type : String},
  imageUrl      : { type : Object},
  createdDate : {type : String},
  createdTime : {type : String}
});

contactPageSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('contactPage', contactPageSchema);