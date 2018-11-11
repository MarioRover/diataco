const controller = require('../../controller');
const fs = require('fs');
const isEmptyObject = require('is-empty-object');

module.exports = new class siteInfoController extends controller {
  async index(req, res, next) {
    try {
      let siteInfo = await this.models.siteInfo.find({}).populate({
        path: 'updateBy',
        select : 'name , family'
      }).exec();
      let user = req.user;
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined'
      } else {
        siteInfo = siteInfo[0]
      }
      res.render('admin/siteSetting/siteInfo', {
        title: 'تنظیمات سایت',
        activeRow: 'site-info',
        user, siteInfo
      });
    } catch (error) {
      this.error('Error in Index method at siteInfoController.js', 500, next);
    }
  };

  async insertInfo(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {nameEn,nameFa,telegram,whatsapp,instagram,facebook,linkedin,version,debug} = req.body;
      const logo = req.file;
      let contentObj = {nameEn,nameFa,telegram,whatsapp,instagram,facebook,linkedin,version,debug,updateBy : req.user._id};

      let siteInfo = await this.models.siteInfo.find({});
      if(this.isEmptyArray(siteInfo)) {
        if(!isEmptyObject(req.file)) {
          contentObj['logo'] = {
            destination: await this.addressImage(logo),
            originalname: logo.originalname,
            path: logo.path
          }
        }
        let newSiteInfo = new this.models.siteInfo({ ...contentObj});
        await newSiteInfo.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.redirectWithMessage(['اطلاعات وب سایت با موفقیت ثبت گردید'], 'success', '/admin/dashboard', res);
      } else {
        let objId = siteInfo[0]._id;
        if (logo && typeof siteInfo[0].logo !== 'undefined') {
          if (siteInfo[0].logo.originalname === logo.originalname) {
            await fs.unlinkSync(logo.path);
          } else {
            if (await fs.existsSync(siteInfo[0].logo.path)) await fs.unlinkSync(siteInfo[0].logo.path);
            contentObj['logo'] = {
              destination: await this.addressImage(logo),
              originalname: logo.originalname,
              path: logo.path
            }
          }
        } else if (logo && typeof siteInfo[0].logo == 'undefined') {
          contentObj['logo'] = {
            destination: await this.addressImage(logo),
            originalname: logo.originalname,
            path: logo.path
          }
        }
        await this.models.siteInfo.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.redirectWithMessage(['اطلاعات وب سایت با موفقیت بروزرسانی گردید'], 'success', '/admin/dashboard', res);
      }
    } catch (error) {
      return this.serverError('Error in insertInfo method of siteInfoController.js', 500, error, res);
    }
  };
}
