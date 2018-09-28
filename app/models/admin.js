const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

const adminSchema = mongoose.Schema({
  name     : { type : String , default : '' },
  family   : { type : String , default : '' },
  email    : { type : String , unique : true  ,required : true },
  password : { type : String ,  required : true },
  profileImg    : { type : Object},
  rememberToken : { type : String , default : null }
}, { timestamps : true });

adminSchema.pre('save', function (next) {
  let salt = bcrypt.genSaltSync(15);
  let hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

adminSchema.pre('save', function (next) {
  this.profileImg = {
    destination: '/img/unknown-humen.jpg',
    originalname: 'unknown-humen.jpg',
    path: 'public\\img\\unknown-humen.jpg'
  }
  next();
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}
adminSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie('remember_token', token, {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    signed: true
  });
  this.update({ rememberToken : token } , error => {
    if(error) console.log(error);
  });
}


module.exports = mongoose.model('Admin' , adminSchema);