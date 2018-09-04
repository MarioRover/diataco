const controller = require('../controller');

class applicationController extends controller {
  async showPage(req , res , next) {
    try {
      res.render('home/application', {
        title: 'اپلیکشن'
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new applicationController();