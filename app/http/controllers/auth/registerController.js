const controller = require('./../controller');

class registerController extends controller {
  showPage(req, res) {
    res.json('register Page');
  }
}

module.exports = new registerController();