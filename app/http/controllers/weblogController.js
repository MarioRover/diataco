const controller = require('./controller');

class weblogController extends controller {
  async showPage(req, res, next) {
    try {
      res.render('home/weblog', {
        title: 'وبلاگ'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new weblogController();