const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class contactPagesController extends controller {

  async index(req, res, next) {
    try {
      let user = req.user;
      let contactPage = await this.models.contactPage.find({});
      if (contactPage == '') {
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

  async set(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors') , 'warning' , res);
      }
      const {address,iconAddress,email,iconEmail,telephone,iconTelephone} = req.body;
      let contentObj = {
        address, iconAddress, email, iconEmail, telephone, iconTelephone,
        imageUrl : {
          destination: await this.addressImage(req.file),
          originalname: req.file.originalname,
          path: req.file.path
        } 
      };
      let newContactPage = new this.models.contactPage({...contentObj});
      newContactPage.save(err => {
        if(err) {
          return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
        }
        return this.izitoastMessage(['اطلاعات با موفقیت ذخیره شد'], 'success', res);
      })
    } catch (error) {
      return this.serverError('Error in set method at sitePagesController.js', 500, error, res);
    }
  }
  async update(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {address,iconAddress,email,iconEmail,telephone,iconTelephone} = req.body;
      let contentObj = {address, iconAddress, email, iconEmail, telephone, iconTelephone};
      let contactPage = await this.models.contactPage.find({});
      let objId = contactPage[0]._id;
      
      if(req.file) {
        if (contactPage[0].imageUrl.originalname === req.file.originalname) {
          await fs.unlinkSync(req.file.path);
        } else {
          await fs.unlinkSync(contactPage[0].imageUrl.path);
          contentObj['imageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
      }
      await this.models.contactPage.findByIdAndUpdate(objId , {$set : {...contentObj , ...contentObj}});
      let newDB = await this.refreshDB(this.models.contactPage);
      let imageUrl = newDB.imageUrl.destination;
      return this.transDataWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', imageUrl , res);
      
    } catch (error) {
      return this.serverError('Error in update method at contactPagesController', 500 , error , res);
    }
  }

  
}
