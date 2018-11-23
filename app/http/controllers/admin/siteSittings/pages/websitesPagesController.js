const controller = require('../../../controller');
const fs = require('fs');
const isEmptyObject = require('is-empty-object');

module.exports = new class websitesPagesController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let websitePage = await this.models.websitePage.find({});
      if (websitePage == '') {
        websitePage = 'undefined';
      } else {
        websitePage = websitePage[0];
      }
      res.render('admin/siteSetting/pages/website', {
        title: 'صفحه وب سایت',
        activeRow: 'site-pages',
        websitePage,user
      });
    } catch (error) {
      return this.serverError('Error in Index method at websitesPagesController.js', 500, error, res);
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
      let websitePage = await this.models.websitePage.find({});

      if (this.isEmptyArray(websitePage)) {
        if(!isEmptyObject(req.file)) {
          contentObj['background'] = {
            destination: await this.addressImage(background),
            originalname: background.originalname,
            path: background.path
          }
        }
        let newWebsitePage = new this.models.websitePage({ ...contentObj});
        await newWebsitePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.redirectWithMessage(['اطلاعات صفحه وب سایت با موفقیت ثبت گردید'], 'success', '/admin/site-setting/pages', res);
      } else {
        let objId = websitePage[0]._id;
        if (background && typeof websitePage[0].background !== 'undefined') {
          if (websitePage[0].background.originalname === background.originalname) {
            await fs.unlinkSync(background.path);
          } else {
            if (await fs.existsSync(websitePage[0].background.path)) await fs.unlinkSync(websitePage[0].background.path);
            contentObj['background'] = {
              destination: await this.addressImage(background),
              originalname: background.originalname,
              path: background.path
            }
          }
        } else if (background && typeof websitePage[0].background == 'undefined') {
          contentObj['background'] = {
            destination: await this.addressImage(background),
            originalname: background.originalname,
            path: background.path
          }
        }
        await this.models.websitePage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.redirectWithMessage(['اطلاعات صفحه وب سایت با موفقیت بروزرسانی گردید'], 'success', '/admin/site-setting/pages', res);
      }
    
      
    } catch (error) {
      return this.serverError('Error in update method at websitesPagesController', 500, error, res);
    }
  }

  
}
