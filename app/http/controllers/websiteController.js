const controller = require('./controller');

class websiteController extends controller {
  showPage(req , res) {
    res.json('websiteController');
  }
}

module.exports = new websiteController();