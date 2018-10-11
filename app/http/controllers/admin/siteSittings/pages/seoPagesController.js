const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class seoPagesController extends controller {

  async index(req, res, next) {
    try {
      let user = req.user;
      let seoPage = await this.models.seoPage.find({});
      if(this.isEmptyArray(seoPage)) {
        seoPage = ''
      } else {
        seoPage = seoPage[0]
      }
      res.render('admin/siteSetting/pages/seo', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        seoPage,user
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
        await newSeoPage.save(err => {
          if (err) {
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

  async description1(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let seoPage = await this.models.seoPage.find({});
      let contentObj = {desc1Desc : req.body.desc};

      if(this.isEmptyArray(seoPage)) {
        if(req.file) {
          contentObj['desc1ImageUrl'] = {
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
        return this.izitoastMessage(['قسمت SEO First Description  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = seoPage[0]._id;
        if (req.file && typeof seoPage[0].desc1ImageUrl !== 'undefined') {
          if (seoPage[0].desc1ImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(seoPage[0].desc1ImageUrl.path)) await fs.unlinkSync(seoPage[0].desc1ImageUrl.path);
            contentObj['desc1ImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof seoPage[0].desc1ImageUrl == 'undefined') {
          contentObj['desc1ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت SEO First Description  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in description1 method of seoPagesController.js', 500, error, res);
    }
  }

  async description2(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let seoPage = await this.models.seoPage.find({});
      let contentObj = {desc2Desc : req.body.desc};

      if(this.isEmptyArray(seoPage)) {
        if(req.file) {
          contentObj['desc2ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        let newSeoPage = new this.models.seoPage({ ...contentObj});
        await newSeoPage.save(err => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت SEO Second Description  با موفقیت بروز رسانی شد'], 'success', res);
      } else {
        let objId = seoPage[0]._id;
        if (req.file && typeof seoPage[0].desc2ImageUrl !== 'undefined') {
          if (seoPage[0].desc2ImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(seoPage[0].desc2ImageUrl.path)) await fs.unlinkSync(seoPage[0].desc2ImageUrl.path);
            contentObj['desc2ImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof seoPage[0].desc2ImageUrl == 'undefined') {
          contentObj['desc2ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.seoPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت SEO Second Description  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in description2 method of seoPagesController.js', 500, error, res);
    }
  }

  async articles(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let seoPage = await this.models.seoPage.find({});
      let {item1,Iconitem1,Descitem1,
          item2,Iconitem2,Descitem2,
          item3,Iconitem3,Descitem3,
          item4,Iconitem4,Descitem4,
          item5,Iconitem5,Descitem5,
          item6,Iconitem6,Descitem6
        } = req.body;
      let contentObj = {
        item1, Iconitem1, Descitem1,
        item2, Iconitem2, Descitem2,
        item3, Iconitem3, Descitem3,
        item4, Iconitem4, Descitem4,
        item5, Iconitem5, Descitem5,
        item6, Iconitem6, Descitem6
      };
      if(this.isEmptyArray(seoPage)) {
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
  
}
