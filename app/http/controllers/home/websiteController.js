const controller = require('../controller');

module.exports = new class websiteController extends controller {
  async showPage(req, res, next) {
    try {
      let websites = await this.models.websites.find({}).limit(8).sort({createdAt :-1}).exec();
      let siteInfo = await this.models.siteInfo.find({});
      let websitePage = await this.models.websitePage.find({});
      if (this.isEmpty(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmpty(websitePage)) {
        websitePage = 'undefined';
      } else {
        websitePage = websitePage[0]
      }
      if(this.isEmpty(websites)) {
        websites = 'undefined';
      }
      res.render('home/website', {
        title: 'Design Website | Official Diata&#x2122; | طراحی سایت در دیاتا',
        websites,siteInfo,websitePage,
        tags : websitePage.tags,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in showPage method in websiteController',500,next);
    }
  }

  async website(req, res, next) {
    try {
      let website = await this.models.websites.find({slug : req.params.website} , (error , website) => {
        if (error) return this.error('Error in find website in websiteController', 500, next);
        if (this.isEmptyArray(website)) return this.error('Error in find website in websiteController', 404, next);
      })
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      res.render('home/website/website', {
        title: 'وب سایت',
        website : website[0],
        siteInfo,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in website method in websiteController', 500, next);
    }
  }
}