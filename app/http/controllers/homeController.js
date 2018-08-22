const controller = require('./controller');

class homeController extends controller {
  showPage(req , res) {
    res.render('home/home');
  }
}

module.exports = new homeController();