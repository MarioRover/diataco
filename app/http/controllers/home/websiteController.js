const controller = require('../controller');

class aboutUs extends controller {
  async showPage(req, res, next) {
    try {
      res.render('home/website', {
        title: 'وب سایت'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new aboutUs();