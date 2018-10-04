const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const categoiesBlogSchema = mongoose.Schema({
  admin : { type : Schema.Types.ObjectId , ref : 'Admin' },
  name  : { type : String },
  imageUrl : { type : Object },
  slug : { type : String },
  viewCount : { type : Number , default : 0 },
  blogCount : { type : Number , default : 0 },
  createdDate : {type : String},
  createdTime : {type : String}
} , { toJSON : { virtuals : true } });

categoiesBlogSchema.plugin(mongoosePaginate);

categoiesBlogSchema.pre('save', function (next) {
  let d = new Date();
  this.createdDate = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  this.createdTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  next();
});

categoiesBlogSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'category'
});

module.exports = mongoose.model('CategoriesBlog', categoiesBlogSchema);