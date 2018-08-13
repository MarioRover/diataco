const path = require('path');
const expressLayouts = require('express-ejs-layouts');

module.exports = {
  public_dir: 'public',
  view_dir: path.resolve('./resource/views'),
  view_engine: 'ejs',
  ejs: {
    expressLayouts,
    extractScript: false,
    extractStyle: false,
    master: 'home/master'
  }
}