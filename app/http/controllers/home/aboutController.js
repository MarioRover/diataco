const controller = require('../controller');

module.exports = new class aboutController extends controller {
  async showPage(req, res, next) {
    try {
      res.render('home/about', {
        title: 'دریاره ما'
      });
    } catch (error) {
      next(error);
    }
  }
}