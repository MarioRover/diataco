const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class contactPagesController extends controller {

  async index(req, res, next) {
    try {
      let contactPage = await this.models.contactPage.find({});
      if (contactPage == '') {
        contactPage = 'undefined';
      } else {
        contactPage = contactPage[0];
      }
      res.render('admin/siteSetting/pages/contact', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        contactPage
      });
    } catch (error) {
      this.error('Error in Index method at sitePagesController.js', 500, next);
    }
  };

  async set(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.json({
          data: req.flash('errors'),
          status : 'warning'
        });
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
          this.error('Error in save contactPage in set method at contactPageController.js' , 500 , next);
          return res.json({
            data : ['ذخیره اطلاعات با مشکل مواجه شد'],
            status : 'error'
          })
        }
        return res.json({
          data: ['اطلاعات با موفقیت ذخیره شد'],
          status: 'success'
        });
      })
    } catch (error) {
      next(error);
    }
  }
  async update(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.json({
          data: req.flash('errors'),
          status : 'warning'
        });
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
      return res.json({
        data : ['تغییرات با موفقیت ثبت گردید'],
        status: 'success'
      })
      
    } catch (error) {
      next(error);
    }
  }

}
