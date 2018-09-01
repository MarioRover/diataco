const controller = require('./controller');

class applicationController extends controller {
  async showPage(req, res, next) {
    try {
      res.render('home/aboutUs', {
        title: 'دریاره ما'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new applicationController();