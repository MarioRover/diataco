const controller = require('../controller');

module.exports = new class aboutController extends controller {
  async showPage(req, res, next) {
    try {
      let aboutPage = await this.models.aboutPage.find({});
      if (this.isEmptyArray(aboutPage)) {
        aboutPage = 'undefined';
      } else {
        aboutPage = aboutPage[0];
      }
      res.render('home/about', {
        title: 'درباره ما',
        aboutPage
      });
    } catch (error) {
      next(error);
    }
  }
}