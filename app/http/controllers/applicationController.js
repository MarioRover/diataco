const controller = require('./controller');

class applicationController extends controller {
  showPage(req , res) {
    res.json('applicationController');
  }
}

module.exports = new applicationController();