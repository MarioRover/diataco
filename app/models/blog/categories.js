const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const categoiesBlogSchema = new Schema({
  admin : { type : Schema.Types.ObjectId , ref : 'Admin' },
  name  : { type : String },
  desc  : { type : String},
  previewImage : { type : Object },
  wallpaper : { type : Object },
  slug : { type : String },
  viewCount : { type : Number , default : 0 },
  blogCount : { type : Number , default : 0 },
  descTags       : { type : String , default : ''},
  keyTags       : { type : String , default : ''}
} , {timestamps: true , toJSON : { virtuals : true } });

categoiesBlogSchema.plugin(mongoosePaginate);

categoiesBlogSchema.methods.path = function () {
  return `/blog/${this.slug}`;
}

categoiesBlogSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'category'
});

module.exports = mongoose.model('CategoriesBlog', categoiesBlogSchema);