const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class homePagesController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let homePage = await this.models.homePage.find({});
      if (this.isEmpty(homePage)) {
        homePage = 'undefined';
      } else {
        homePage = homePage[0];
      }
      res.render('admin/siteSetting/pages/home', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        homePage , user
      });
    } catch (error) {
      return this.serverError('Error in Index method at sitePagesController.js', 500, error, res);
    }
  }
  async homeSlider(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {homeSlideritem1,homeSlidericonItem1,homeSlideritem2,homeSlidericonItem2,homeSlideritem3,homeSlidericonItem3} = req.body;
      let contentObj = {homeSlideritem1,homeSlidericonItem1,homeSlideritem2,homeSlidericonItem2,homeSlideritem3,homeSlidericonItem3};
      const homeSliderImageUrl = req.file;
      let homePage = await this.models.homePage.find({});
      if(this.isEmpty(homePage)) {
        if(!this.isEmpty(homeSliderImageUrl)) {
          contentObj['homeSliderImageUrl'] = {
            destination: await this.addressImage(homeSliderImageUrl),
            originalname: homeSliderImageUrl.originalname,
            path: homeSliderImageUrl.path
          }
        }
        let newHomePage = new this.models.homePage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Home Slider با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = homePage[0]._id;
        if (homeSliderImageUrl && typeof homePage[0].homeSliderImageUrl !== 'undefined') {
          if (homePage[0].homeSliderImageUrl.originalname === homeSliderImageUrl.originalname) {
            await fs.unlinkSync(homeSliderImageUrl.path);
          } else {
            if (await fs.existsSync(homePage[0].homeSliderImageUrl.path)) await fs.unlinkSync(homePage[0].homeSliderImageUrl.path);
            contentObj['homeSliderImageUrl'] = {
              destination: await this.addressImage(homeSliderImageUrl),
              originalname: homeSliderImageUrl.originalname,
              path: homeSliderImageUrl.path
            }
          }
        } else if (homeSliderImageUrl && typeof homePage[0].homeSliderImageUrl == 'undefined') {
          contentObj['homeSliderImageUrl'] = {
            destination: await this.addressImage(homeSliderImageUrl),
            originalname: homeSliderImageUrl.originalname,
            path: homeSliderImageUrl.path
          }
        }
        await this.models.homePage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Home Slider با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in homePage method at sitePagesController.js', 500, error, res);
    }
  }
  async aboutUs(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {aboutUsheader,aboutUsheaderDesc} = req.body;
      let contentObj = {aboutUsheader,aboutUsheaderDesc};
      const aboutUsImageUrl = req.file;
      let homePage = await this.models.homePage.find({});
      if(this.isEmpty(homePage)) {
        if(!this.isEmpty(aboutUsImageUrl)) {
          contentObj['aboutUsImageUrl'] = {
            destination: await this.addressImage(aboutUsImageUrl),
            originalname: aboutUsImageUrl.originalname,
            path: aboutUsImageUrl.path
          }
        }
        let newHomePage = new this.models.homePage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت About Us با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = homePage[0]._id;
        if (aboutUsImageUrl && typeof homePage[0].aboutUsImageUrl !== 'undefined') {
          if (homePage[0].aboutUsImageUrl.originalname === aboutUsImageUrl.originalname) {
            await fs.unlinkSync(aboutUsImageUrl.path);
          } else {
            if (await fs.existsSync(homePage[0].aboutUsImageUrl.path)) await fs.unlinkSync(homePage[0].aboutUsImageUrl.path);
            contentObj['aboutUsImageUrl'] = {
              destination: await this.addressImage(aboutUsImageUrl),
              originalname: aboutUsImageUrl.originalname,
              path: aboutUsImageUrl.path
            }
          }
        } else if (aboutUsImageUrl && typeof homePage[0].aboutUsImageUrl == 'undefined') {
          contentObj['aboutUsImageUrl'] = {
            destination: await this.addressImage(aboutUsImageUrl),
            originalname: aboutUsImageUrl.originalname,
            path: aboutUsImageUrl.path
          }
        }
        await this.models.homePage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت About Us با موفقیت بروزرسانی شد'] , 'success' , res);
      }

    } catch (error) {
      return this.serverError('Error in aboutUs method at sitePagesController.js', 500, error, res);
    }
  }
  async ability(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) return this.izitoastMessage(req.flash('errors'), 'warning', res);
      let contentObj = {
        abilityitem1 : req.body.abilityitem1,
        abilityDescitem1 : req.body.abilityDescitem1,
        abilityitem2 : req.body.abilityitem2,
        abilityDescitem2 : req.body.abilityDescitem2,
        abilityitem3 : req.body.abilityitem3,
        abilityDescitem3 : req.body.abilityDescitem3,
        abilityitem4 : req.body.abilityitem4,
        abilityDescitem4 : req.body.abilityDescitem4,
        abilityitem5 : req.body.abilityitem5,
        abilityDescitem5 : req.body.abilityDescitem5,
        abilityitem6 : req.body.abilityitem6,
        abilityDescitem6 : req.body.abilityDescitem6
      }
      let homePage = await this.models.homePage.find({});
      if(this.isEmpty(homePage)) {
        let newHomePage = new this.models.homePage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Ability با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = homePage[0]._id;
        await this.models.homePage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Ability با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in ability method at sitePagesController.js', 500, error, res);
    }
  }
  async parallax(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let contentObj = {
        headerParallax : req.body.headerParallax,
        descParallax   : req.body.descParallax
      }
      const parallaxImageUrl = req.file;
      let homePage = await this.models.homePage.find({});
      if(this.isEmpty(homePage)) {
        if(!this.isEmpty(parallaxImageUrl)) {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(parallaxImageUrl),
            originalname: parallaxImageUrl.originalname,
            path: parallaxImageUrl.path
          }
        }
        let newHomePage = new this.models.homePage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Home Slider با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = homePage[0]._id;
        if (parallaxImageUrl && typeof homePage[0].parallaxImageUrl !== 'undefined') {
          if (homePage[0].parallaxImageUrl.originalname === parallaxImageUrl.originalname) {
            await fs.unlinkSync(parallaxImageUrl.path);
          } else {
            if (await fs.existsSync(homePage[0].parallaxImageUrl.path)) await fs.unlinkSync(homePage[0].parallaxImageUrl.path);
            contentObj['parallaxImageUrl'] = {
              destination: await this.addressImage(parallaxImageUrl),
              originalname: parallaxImageUrl.originalname,
              path: parallaxImageUrl.path
            }
          }
        } else if (parallaxImageUrl && typeof homePage[0].parallaxImageUrl == 'undefined') {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(parallaxImageUrl),
            originalname: parallaxImageUrl.originalname,
            path: parallaxImageUrl.path
          }
        }
        await this.models.homePage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Home Slider با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in parallax method at sitePagesController.js', 500, error, res);
    }
  }
}


