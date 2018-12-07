const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class seoPagesController extends controller {

  async index(req, res, next) {
    try {
      let user = req.user;
      let seoPage = await this.models.seoPage.find({});
      if(this.isEmpty(seoPage)) {
        seoPage = ''
      } else {
        seoPage = seoPage[0]
      }
      res.render('admin/siteSetting/pages/seo', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        seoPage,user,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.serverError('Error in Index method at seoPagesController.js', 500, error, res);
    }
  };

  async header(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let seoPage = await this.models.seoPage.find({});
      let contentObj = {headerTitle : req.body.title};

      if(this.isEmptyArray(seoPage)) {
        if(req.file) {
          contentObj['headerImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        let newSeoPage = new this.models.seoPage({ ...contentObj});
        await newSeoPage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت SEO Header  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = seoPage[0]._id;
        if (req.file && typeof seoPage[0].headerImageUrl !== 'undefined') {
          if (seoPage[0].headerImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(seoPage[0].headerImageUrl.path)) await fs.unlinkSync(seoPage[0].headerImageUrl.path);
            contentObj['headerImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof seoPage[0].headerImageUrl == 'undefined') {
          contentObj['headerImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت SEO Header  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in header method of seoPagesController.js', 500, error, res);
    }
  }

  async description(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let contentObj = {desc : req.body.desc};
      let seoPage = await this.models.seoPage.find({});
      if(this.isEmpty(seoPage)) {
        let newSeoPage = new this.models.seoPage({ ...contentObj});
        await newSeoPage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت SEO Description با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = seoPage[0]._id;
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت SEO Description با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in description method of seoPagesController.js', 500, error, res);
    }
  }

  async articles(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let seoPage = await this.models.seoPage.find({});
      let {item1,Descitem1,
          item2,Descitem2,
          item3,Descitem3,
          item4,Descitem4,
          item5,Descitem5,
          item6,Descitem6
        } = req.body;
      let contentObj = {
        item1, Descitem1,
        item2, Descitem2,
        item3, Descitem3,
        item4, Descitem4,
        item5, Descitem5,
        item6, Descitem6
      };
      if(this.isEmpty(seoPage)) {
        let newSeoPage = new this.models.aboutPage({ ...contentObj});
        await newSeoPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت SEO Article  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = seoPage[0]._id;
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت SEO Article  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in articles method of seoPagesController.js', 500, error, res);
    }
  }

  async parallax(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let seoPage = await this.models.seoPage.find({});
      let contentObj = {};
      if (this.isEmptyArray(seoPage)) {
        if (req.file) {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        let newSeoPage = new this.models.seoPage({ ...contentObj});
        
        await newSeoPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت SEO Parallax  با موفقیت بروز رسانی شد'], 'success', res);
      } else {
        let objId = seoPage[0]._id;
        if (req.file && typeof seoPage[0].parallaxImageUrl !== 'undefined') {
          if (seoPage[0].parallaxImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(seoPage[0].parallaxImageUrl.path)) await fs.unlinkSync(seoPage[0].parallaxImageUrl.path);
            contentObj['parallaxImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof seoPage[0].parallaxImageUrl == 'undefined') {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,
            ...contentObj
          }
        });
        return this.izitoastMessage(['قسمت SEO Parallax  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in parallax method of seoPagesController.js', 500, error, res);
    }
  }
  async tags(req , res , next) {
    try {
      let contentObj = {
        descTags : req.body.descTags,
        keyTags  : req.body.keyTags
      };
      let seoPage = await this.models.seoPage.find({});
      if(this.isEmpty(seoPage)) {
        let newHomePage = new this.models.seoPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت SEO Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = seoPage[0]._id;
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت SEO Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in tags method at sitePagesController.js', 500, error, res);
    }
  }
}
