const controller = require('./../controller');

class adminController extends controller {
  showPage(req, res) {
    res.json('Admin Page');
  }
}

module.exports = new adminController();