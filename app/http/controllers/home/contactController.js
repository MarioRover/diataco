const controller = require('../controller');

class contactController extends controller {
  async showPage(req, res, next) {
    try {
      res.render('home/contact', {
        title: 'دریاره ما'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new contactController();