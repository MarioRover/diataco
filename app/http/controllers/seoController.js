const controller = require('./controller');

class seoController extends controller {
  async showPage(req, res, next) {
    try {
      res.render('home/seo', {
        title: 'سئو'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new seoController();