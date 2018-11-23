const mongoose = require('mongoose');
const Schema   = mongoose.Schema;   
const mongoosePaginate = require('mongoose-paginate');

const applicationsSchema = new Schema({
  admin : { type : Schema.Types.ObjectId , ref : 'Admin' },
  updatedBy   : { type : Schema.Types.ObjectId , ref : 'Admin'},
  name : { type : String },
  slug : { type : String },
  link : { type : String },
  desc : { type : String },
  logo : { type : Object },
  appstore : { type : String },
  sibapp   : { type : String },
  googleplay : { type : String },
  cafebazar  : { type : String },
  viewCount  : { type : Number , default : 0 },
  commentCount : { type : Number , default : 0 },
  previewImage : { type : Object },
  image1 : { type : Object , default : '' },
  image2 : { type : Object , default : '' },
  image3 : { type : Object , default : '' },
  image4 : { type : Object , default : '' },
  image5 : { type : Object , default : '' },
  image6 : { type : Object , default : '' }

} , {timestamps : true});
applicationsSchema.plugin(mongoosePaginate);

applicationsSchema.methods.path = function () {
  return `/applications/${this.slug}`;
}

module.exports = mongoose.model('Applications', applicationsSchema);