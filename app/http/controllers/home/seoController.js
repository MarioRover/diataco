const controller = require('../controller');

module.exports = new class seoController extends controller {
  async index(req, res, next) {
    try {
      let seoPage = await this.models.seoPage.find({});
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmptyArray(seoPage)) {
        seoPage = ''
      } else {
        seoPage = seoPage[0]
      }
      res.render('home/seo', {
        title: 'سئو',
        seoPage,siteInfo
      });
    } catch (error) {
      return this.serverError('Error in Index method at seoPagesController.js', 500, error, res);
    }
  }
}