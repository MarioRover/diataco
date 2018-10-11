const controller = require('../controller');

module.exports = new class seoController extends controller {
  async index(req, res, next) {
    try {
      let seoPage = await this.models.seoPage.find({});
      if (this.isEmptyArray(seoPage)) {
        seoPage = ''
      } else {
        seoPage = seoPage[0]
      }
      res.render('home/seo', {
        title: 'سئو',
        seoPage
      });
    } catch (error) {
      return this.serverError('Error in Index method at seoPagesController.js', 500, error, res);
    }
  }
}