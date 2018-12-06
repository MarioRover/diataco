const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class aboutPagesController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let aboutPage = await this.models.aboutPage.find({});
      if (this.isEmpty(aboutPage)) {
        aboutPage = 'undefined';
      } else {
        aboutPage = aboutPage[0];
      }
      res.render('admin/siteSetting/pages/about', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        user,aboutPage,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.serverError('Error in Index method at aboutPagesController.js', 500, error, res);
    }
  };
  async header(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let contentObj = {headerTitle : req.body.title};
      const headerImageUrl = req.file;
      let aboutPage = await this.models.aboutPage.find({});
      if(this.isEmpty(aboutPage)) {
        if(!this.isEmpty(headerImageUrl)) {
          contentObj['headerImageUrl'] = {
            destination: await this.addressImage(headerImageUrl),
            originalname: headerImageUrl.originalname,
            path: headerImageUrl.path
          }
        }
        let newHomePage = new this.models.aboutPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Header با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        if (headerImageUrl && typeof aboutPage[0].headerImageUrl !== 'undefined') {
          if (aboutPage[0].headerImageUrl.originalname === headerImageUrl.originalname) {
            await fs.unlinkSync(headerImageUrl.path);
          } else {
            if (await fs.existsSync(aboutPage[0].headerImageUrl.path)) await fs.unlinkSync(aboutPage[0].headerImageUrl.path);
            contentObj['headerImageUrl'] = {
              destination: await this.addressImage(headerImageUrl),
              originalname: headerImageUrl.originalname,
              path: headerImageUrl.path
            }
          }
        } else if (headerImageUrl && typeof aboutPage[0].headerImageUrl == 'undefined') {
          contentObj['headerImageUrl'] = {
            destination: await this.addressImage(headerImageUrl),
            originalname: headerImageUrl.originalname,
            path: headerImageUrl.path
          }
        }
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Header با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in header method at aboutPagesController.js', 500, error, res);
    }
  }
  async description(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let contentObj = {descDesc : req.body.desc};
      let aboutPage = await this.models.aboutPage.find({});
      if(this.isEmpty(aboutPage)) {
        let newHomePage = new this.models.aboutPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Description با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Description با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in description method at aboutPagesController.js', 500, error, res);
    }
  }
  async articles(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let aboutPage = await this.models.aboutPage.find({});
      let contentObj = {
        item1 : req.body.item1,
        Descitem1 : req.body.Descitem1,
        item2 : req.body.item2,
        Descitem2 : req.body.Descitem2,
        item3 : req.body.item3,
        Descitem3 : req.body.Descitem3,
        item4 : req.body.item4,
        Descitem4 : req.body.Descitem4,
        item5 : req.body.item5,
        Descitem5 : req.body.Descitem5,
        item6 : req.body.item6,
        Descitem6 : req.body.Descitem6,
      }
      if(this.isEmpty(aboutPage)) {
        let newHomePage = new this.models.aboutPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Articles با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Articles با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in articles method at aboutPagesController.js', 500, error, res);
    }
  }
  async parallax(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let contentObj = {parallaxText : req.body.parallaxText}
      const parallaxImageUrl = req.file;
      let aboutPage = await this.models.aboutPage.find({});
      
      if(this.isEmpty(aboutPage)) {
        if(!this.isEmpty(parallaxImageUrl)) {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(parallaxImageUrl),
            originalname: parallaxImageUrl.originalname,
            path: parallaxImageUrl.path
          }
        }
        let newHomePage = new this.models.aboutPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Parallax با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        if (parallaxImageUrl && typeof aboutPage[0].parallaxImageUrl !== 'undefined') {
          if (aboutPage[0].parallaxImageUrl.originalname === parallaxImageUrl.originalname) {
            await fs.unlinkSync(parallaxImageUrl.path);
          } else {
            if (await fs.existsSync(aboutPage[0].parallaxImageUrl.path)) await fs.unlinkSync(aboutPage[0].parallaxImageUrl.path);
            contentObj['parallaxImageUrl'] = {
              destination: await this.addressImage(parallaxImageUrl),
              originalname: parallaxImageUrl.originalname,
              path: parallaxImageUrl.path
            }
          }
        } else if (parallaxImageUrl && typeof aboutPage[0].parallaxImageUrl == 'undefined') {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(parallaxImageUrl),
            originalname: parallaxImageUrl.originalname,
            path: parallaxImageUrl.path
          }
        }
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Parallax با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in parallax method at aboutPagesController.js', 500, error, res);
    }
  }
  async tags(req , res , next) {
    try {
      let contentObj = {tags : req.body.tags};
      let aboutPage = await this.models.aboutPage.find({});;
      if(this.isEmpty(aboutPage)) {
        let newHomePage = new this.models.aboutPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in tags method at sitePagesController.js', 500, error, res);
    }
  }
}
