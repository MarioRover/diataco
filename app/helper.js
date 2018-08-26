const path = require('path');

module.exports = class Helpers {
  constructor(req , res) {
    this.req = req;
    this.res = res;
  }
  getObjects() {
    return {
      viewPath : this.viewPath
    }
  }
  viewPath(dir) {
    return path.resolve(config.layout.view_dir + '/' + dir);
  }
}