const controller = require('./../controller');

class loginController extends controller {
  showPage(req, res) {
    res.json('login Page');
  }
}

module.exports = new loginController();