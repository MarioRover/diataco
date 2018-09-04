const controller = require('../controller');

class homeController extends controller {
  async showPage(req , res) {
    try {
      res.render('home/home', {
        title: 'Diata'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new homeController();