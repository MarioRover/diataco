const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const BlogSchema = mongoose.Schema({
  admin       : { type : Schema.Types.ObjectId , ref : 'Admin' },
  updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admin' },
  category    : { type : Schema.Types.ObjectId , ref : 'CategoriesBlog' },
  title       : { type : String },
  imageUrl    : { type : Object },
  slug        : { type : String },
  tags        : { type : String },
  viewCount   : { type : Number , default : 0 },
  commentCount: { type : Number , default : 0 },
  description : { type : String },
  summery     : { type : String },
  createdDate : {type : String},
  createdTime : {type : String},
  updatedDate : {type : String},
  updatedTime : {type : String}
});

BlogSchema.plugin(mongoosePaginate);

BlogSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);