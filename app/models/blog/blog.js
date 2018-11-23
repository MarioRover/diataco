const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const BlogSchema = new Schema({
  admin       : { type : Schema.Types.ObjectId , ref : 'Admin' },
  updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admin'},
  category    : { type : Schema.Types.ObjectId , ref : 'CategoriesBlog' },
  title       : { type : String },
  imageUrl    : { type : Object },
  slug        : { type : String },
  tags        : { type : String },
  viewCount   : { type : Number , default : 0 },
  commentCount: { type : Number , default : 0 },
  description : { type : String },
  summery     : { type : String }
} , { timestamps : true });

BlogSchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Blog', BlogSchema);