const controller = require('../../../controller');

module.exports = new class sitePagesController extends controller {
  async index(req, res , next) {
    try {
      let user = req.user;
      res.render('admin/siteSetting/pages/index' , {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        user
      });
    } catch (error) {
      this.error('Error in Index method at sitePagesController.js', 500, next);
    }
  };
}
