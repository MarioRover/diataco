const controller = require('../controller');

module.exports = new class aboutController extends controller {
  async showPage(req, res, next) {
    try {
      let aboutPage = await this.models.aboutPage.find({});
      let webUsers = await this.models.webUsers.find({});
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmptyArray(webUsers)) {
        webUsers = 'undefined';
      }
      if (this.isEmptyArray(aboutPage)) {
        aboutPage = 'undefined';
      } else {
        aboutPage = aboutPage[0];
      }
      res.render('home/about', {
        title: 'درباره ما',
        aboutPage,webUsers,siteInfo
      });
    } catch (error) {
      this.error('Error in showPage method at aboutController.js', 500, next);
    }
  }
}