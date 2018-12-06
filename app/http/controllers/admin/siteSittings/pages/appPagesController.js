const controller = require('../../../controller');
const fs = require('fs');
const isEmptyObject = require('is-empty-object');

module.exports = new class appPagesController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let appPage = await this.models.applicationPage.find({});
      if (appPage == '') {
        appPage = 'undefined';
      } else {
        appPage = appPage[0];
      }
      res.render('admin/siteSetting/pages/application', {
        title: 'صفحه اپلیکیشن',
        activeRow: 'site-pages',
        appPage,user,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.serverError('Error in Index method at appPagesController.js', 500, error, res);
    }
  };
  async update(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {title,desc} = req.body;
      const background = req.file;
      let contentObj = {title,desc};
      let appPage = await this.models.applicationPage.find({});

      if (this.isEmptyArray(appPage)) {
        if(!isEmptyObject(req.file)) {
          contentObj['background'] = {
            destination: await this.addressImage(background),
            originalname: background.originalname,
            path: background.path
          }
        }
        let newAppPage = new this.models.applicationPage({ ...contentObj});
        await newAppPage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.redirectWithMessage(['اطلاعات صفحه اپلیکیشن با موفقیت ثبت گردید'], 'success', '/admin/site-setting/pages', res);
      } else {
        let objId = appPage[0]._id;
        if (background && typeof appPage[0].background !== 'undefined') {
          if (appPage[0].background.originalname === background.originalname) {
            await fs.unlinkSync(background.path);
          } else {
            if (await fs.existsSync(appPage[0].background.path)) await fs.unlinkSync(appPage[0].background.path);
            contentObj['background'] = {
              destination: await this.addressImage(background),
              originalname: background.originalname,
              path: background.path
            }
          }
        } else if (background && typeof appPage[0].background == 'undefined') {
          contentObj['background'] = {
            destination: await this.addressImage(background),
            originalname: background.originalname,
            path: background.path
          }
        }
        await this.models.applicationPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.redirectWithMessage(['اطلاعات صفحه اپلیکیشن با موفقیت بروزرسانی گردید'], 'success', '/admin/site-setting/pages', res);
      }
    
      
    } catch (error) {
      return this.serverError('Error in update method at appPagesController', 500, error, res);
    }
  }
  async tags(req , res , next) {
    try {
      let contentObj = {tags : req.body.tags};
      let applicationPage = await this.models.applicationPage.find({});
      if(this.isEmpty(applicationPage)) {
        let newHomePage = new this.models.applicationPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Application Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = applicationPage[0]._id;
        await this.models.applicationPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Application Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in tags method at appPagesController.js', 500, error, res);
    }
  }
  
}
