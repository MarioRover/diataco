const controller = require('../controller');

module.exports = new class applicationController extends controller {
  async showPage(req, res, next) {
    try {
      let applications = await this.models.applications.find({}).limit(8).sort({createdAt :-1}).exec();
      let siteInfo = await this.models.siteInfo.find({});
      let appPage = await this.models.applicationPage.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmptyArray(appPage)) {
        appPage = 'undefined';
      } else {
        appPage = appPage[0]
      }
      if(this.isEmptyArray(applications)) {
        applications = 'undefined';
      }
      res.render('home/application/index', {
        title: 'Design Application | Official Diata&#x2122; | طراحی اپلیکیشن در دیاتا',
        applications,siteInfo,appPage,
        tags : appPage.tags,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in showPage method in applicationController', 500, next);
    }
  }

  async application(req, res, next) {
    try {
      let application = await this.models.applications.find({slug : req.params.application} , (error , application) => {
        if (error) return this.error('Error in find application in applicationController', 500, next);
        if (this.isEmptyArray(application)) return this.error('Error in find application in applicationController', 404, next);
      })
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      res.render('home/application/application', {
        title: 'اپلیکیشن',
        application : application[0],siteInfo,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in application method in applicationController', 500, next);
    }
  }
}