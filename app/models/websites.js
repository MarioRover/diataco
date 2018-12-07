const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   
const mongoosePaginate = require('mongoose-paginate');

const websitesSchema = new Schema({
  admin : { type : Schema.Types.ObjectId , ref : 'Admin' },
  updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admin'},
  name : { type : String },
  slug : { type : String },
  link : { type : String },
  desc : { type : String },
  logo : { type : Object },
  viewCount : { type : Number , default : 0 },
  commentCount : { type : Number , default : 0 },
  wallpaper : { type : Object },
  previewImage : { type : Object },
  image1 : { type : Object , default : '' },
  image2 : { type : Object , default : '' },
  image3 : { type : Object , default : '' },
  image4 : { type : Object , default : '' },
  image5 : { type : Object , default : '' },
  image6 : { type : Object , default : '' },
  descTags       : { type : String , default : ''},
  keyTags       : { type : String , default : ''}

} , {timestamps : true});
websitesSchema.plugin(mongoosePaginate);

websitesSchema.methods.path = function() {
  return `/websites/${this.slug}`;
}

module.exports = mongoose.model('Websites', websitesSchema);