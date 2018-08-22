const controller = require('./controller');

class homeController extends controller {
  showPage(req , res) {
    res.render('home/home');
  }
  page404(req , res) {
    res.render('pageNotFound');
  }
}

module.exports = new homeController();