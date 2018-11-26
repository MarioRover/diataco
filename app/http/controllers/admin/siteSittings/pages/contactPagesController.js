const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class contactPagesController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let contactPage = await this.models.contactPage.find({});
      if (this.isEmpty(contactPage)) {
        contactPage = 'undefined';
      } else {
        contactPage = contactPage[0];
      }
      res.render('admin/siteSetting/pages/contact', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        contactPage,user
      });
      
    } catch (error) {
      return this.serverError('Error in Index method at sitePagesController.js', 500, error, res);
    }
  };
  async contactPage(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {address,email,telephone} = req.body;
      let contentObj = {address,email,telephone};
      const imageUrl = req.file;
      let contactPage = await this.models.contactPage.find({});
      if(this.isEmpty(contactPage)) {
        if(!this.isEmpty(imageUrl)) {
          contentObj['imageUrl'] = {
            destination: await this.addressImage(imageUrl),
            originalname: imageUrl.originalname,
            path: imageUrl.path
          }
        }
        let newHomePage = new this.models.contactPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Contact با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = contactPage[0]._id;
        if (imageUrl && typeof contactPage[0].imageUrl !== 'undefined') {
          if (contactPage[0].imageUrl.originalname === imageUrl.originalname) {
            await fs.unlinkSync(imageUrl.path);
          } else {
            if (await fs.existsSync(contactPage[0].imageUrl.path)) await fs.unlinkSync(contactPage[0].imageUrl.path);
            contentObj['imageUrl'] = {
              destination: await this.addressImage(imageUrl),
              originalname: imageUrl.originalname,
              path: imageUrl.path
            }
          }
        } else if (imageUrl && typeof contactPage[0].imageUrl == 'undefined') {
          contentObj['imageUrl'] = {
            destination: await this.addressImage(imageUrl),
            originalname: imageUrl.originalname,
            path: imageUrl.path
          }
        }
        await this.models.contactPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Contact با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in contactPage method at sitePagesController.js', 500, error, res);
    }
  }
  async tags(req , res , next) {
    try {
      let contentObj = {tags : req.body.tags};
      let contactPage = await this.models.contactPage.find({});
      if(this.isEmpty(contactPage)) {
        let newHomePage = new this.models.contactPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Contact Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = contactPage[0]._id;
        await this.models.contactPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Contact Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in tags method at sitePagesController.js', 500, error, res);
    }
  } 
}
