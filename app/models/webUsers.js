const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   

const webUsersSchema = new Schema({
  admin       : { type : Schema.Types.ObjectId , ref : 'Admin' },
  name        : {type : String},
  job         : {type : String},
  telegram    : {type : String , default : ''},
  whatsapp    : {type : String , default : ''},
  website     : {type : String , default : ''},
  email       : {type : String , default : ''},
  instagram   : {type : String , default : ''},
  facebook    : {type : String , default : ''},
  imageUrl    : {type : Object},
  backgroundUrl    : {type : Object , default : ''},
  createdDate : {type : String},
  createdTime : {type : String}
});

webUsersSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});


module.exports = mongoose.model('webUsers', webUsersSchema);