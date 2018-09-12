const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema   = mongoose.Schema;

const contactSchema = new Schema({
  fullName : {type : String},
  email    : {type : String},
  phone    : {type : String},
  description : {type : String}
});
contactSchema.plugin(timestamps);

module.exports = mongoose.model('Contact', contactSchema);