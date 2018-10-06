const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class aboutPagesController extends controller {

  async index(req, res, next) {
    try {
      let user = req.user;
      let aboutPage = await this.models.aboutPage.find({});
      if (this.isEmptyArray(aboutPage)) {
        aboutPage = 'undefined';
      } else {
        aboutPage = aboutPage[0];
      }
      res.render('admin/siteSetting/pages/about', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        user,aboutPage
      });
    } catch (error) {
      return this.serverError('Error in Index method at aboutPagesController.js', 500, error, res);
    }
  };

  async header(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const headerImage = req.file;
      let aboutPage = await this.models.aboutPage.find({});
      let contentObj = {headerTitle : req.body.title};

      if(this.isEmptyArray(aboutPage)) {
        if(req.file) {
          contentObj['headerImageUrl'] = {
            destination: await this.addressImage(headerImage),
            originalname: headerImage.originalname,
            path: headerImage.path
          }
        }
        let newAboutPage = new this.models.aboutPage({ ...contentObj});
        await newAboutPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Header  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        if (req.file && typeof aboutPage[0].headerImageUrl !== 'undefined') {
          if (aboutPage[0].headerImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(aboutPage[0].headerImageUrl.path)) await fs.unlinkSync(aboutPage[0].headerImageUrl.path);
            contentObj['headerImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof aboutPage[0].headerImageUrl == 'undefined') {
          contentObj['headerImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Header  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in header method of aboutPagesController.js', 500, error, res);
    }
  }

  async description1(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let aboutPage = await this.models.aboutPage.find({});
      let contentObj = {desc1Desc : req.body.desc};

      if(this.isEmptyArray(aboutPage)) {
        if(req.file) {
          contentObj['desc1ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        let newAboutPage = new this.models.aboutPage({ ...contentObj});
        await newAboutPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About First Description  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        if (req.file && typeof aboutPage[0].desc1ImageUrl !== 'undefined') {
          if (aboutPage[0].desc1ImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(aboutPage[0].desc1ImageUrl.path)) await fs.unlinkSync(aboutPage[0].desc1ImageUrl.path);
            contentObj['desc1ImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof aboutPage[0].desc1ImageUrl == 'undefined') {
          contentObj['desc1ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Header  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in description1 method of aboutPagesController.js', 500, error, res);
    }
  }

  async description2(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let aboutPage = await this.models.aboutPage.find({});
      let contentObj = {desc2Desc : req.body.desc};

      if(this.isEmptyArray(aboutPage)) {
        if(req.file) {
          contentObj['desc2ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        let newAboutPage = new this.models.aboutPage({ ...contentObj});
        await newAboutPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About First Description  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        if (req.file && typeof aboutPage[0].desc2ImageUrl !== 'undefined') {
          if (aboutPage[0].desc2ImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(aboutPage[0].desc2ImageUrl.path)) await fs.unlinkSync(aboutPage[0].desc2ImageUrl.path);
            contentObj['desc2ImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof aboutPage[0].desc2ImageUrl == 'undefined') {
          contentObj['desc2ImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Header  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in description2 method of aboutPagesController.js', 500, error, res);
    }
  }

  async articles(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let aboutPage = await this.models.aboutPage.find({});
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
      if(this.isEmptyArray(aboutPage)) {
        let newAboutPage = new this.models.aboutPage({ ...contentObj});
        await newAboutPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Article  با موفقیت بروز رسانی شد'] ,'success' , res);
      } else {
        let objId = aboutPage[0]._id;
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Article  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in articles method of aboutPagesController.js', 500, error, res);
    }
  }

  async parallax(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let aboutPage = await this.models.aboutPage.find({});
      let contentObj = {};
      if (this.isEmptyArray(aboutPage)) {
        if (req.file) {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        let newAboutPage = new this.models.aboutPage({ ...contentObj});
        
        await newAboutPage.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Parallax  با موفقیت بروز رسانی شد'], 'success', res);
      } else {
        let objId = aboutPage[0]._id;
        if (req.file && typeof aboutPage[0].parallaxImageUrl !== 'undefined') {
          if (aboutPage[0].parallaxImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(aboutPage[0].parallaxImageUrl.path)) await fs.unlinkSync(aboutPage[0].parallaxImageUrl.path);
            contentObj['parallaxImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        } else if(req.file && typeof aboutPage[0].parallaxImageUrl == 'undefined') {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
        await this.models.aboutPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,
            ...contentObj
          }
        });
        return this.izitoastMessage(['قسمت About Parallax  با موفقیت بروز رسانی شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in parallax method of aboutPagesController.js', 500, error, res);
    }
  }


  
}
