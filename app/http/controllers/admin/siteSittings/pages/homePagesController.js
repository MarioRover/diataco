const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class homePagesController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let aboutUs = await this.models.aboutUs.find({});
      let parallax = await this.models.parallax.find({});
      let homeSlider = await this.models.homeSlider.find({});
      let ability = await this.models.ability.find({});
      if (aboutUs == '') {
        aboutUs = 'undefined';
      } else {
        aboutUs = aboutUs[0];
      }
      if (parallax == '') {
        parallax = 'undefined';
      } else {
        parallax = parallax[0];
      }
      if (homeSlider == '') {
        homeSlider = 'undefined';
      } else {
        homeSlider = homeSlider[0];
      }
      if (ability == '') {
        ability = 'undefined';
      } else {
        ability = ability[0];
      }
      res.render('admin/siteSetting/pages/home', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        aboutUs, parallax, homeSlider, ability,user
      });
    } catch (error) {
      return this.serverError('Error in Index method at sitePagesController.js', 500, error, res);
    }
  };

  async updateAbout(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {
        aboutUsheader,
        aboutUsheaderDesc
      } = req.body;
      let contentObj = {
        aboutUsheader,
        aboutUsheaderDesc
      };
      const aboutUsphoto = req.file;

      let aboutUs = await this.models.aboutUs.find({});
      let aboutUsCheck = await this.checkObj(aboutUs);
      if (!aboutUsCheck) {
        if (req.file) {
          contentObj['aboutUsImageUrl'] = {
            destination: await this.addressImage(aboutUsphoto),
            originalname: aboutUsphoto.originalname,
            path: aboutUsphoto.path
          }
        }
        let newaboutUs = new this.models.aboutUs({ ...contentObj
        });
        await newaboutUs.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.transDataWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', imageUrl, res);
      } else {
        let objId = aboutUs[0]._id;
        if (req.file) {
          if (aboutUs[0].aboutUsImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(aboutUs[0].aboutUsImageUrl.path)) await fs.unlinkSync(aboutUs[0].aboutUsImageUrl.path);
            contentObj['aboutUsImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        }

        await this.models.aboutUs.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        let newDB = await this.refreshDB(this.models.aboutUs);
        let imageUrl = {
          aboutUsImg: newDB.aboutUsImageUrl.destination
        }
        return this.transDataWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', imageUrl, res);
      }
    } catch (error) {
      return this.serverError('Error in updateAbout method at homePagesController', 500, error, res);
    }
  }

  async updateParallax(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {
        headerParallax,
        descParallax
      } = req.body;
      let contentObj = {
        headerParallax,
        descParallax
      };
      const parallaxphoto = req.file;

      let parallax = await this.models.parallax.find({});
      let parallaxCheck = await this.checkObj(parallax);
      if (!parallaxCheck) {
        if (req.file) {
          contentObj['parallaxImageUrl'] = {
            destination: await this.addressImage(parallaxphoto),
            originalname: parallaxphoto.originalname,
            path: parallaxphoto.path
          }
        }
        let newParallax = new this.models.parallax({ ...contentObj });
        
        newParallax.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
          return this.izitoastMessage(['اطلاعات با موفقیت ذخیره شد'], 'success', res);
        });
      } else {
        let objId = parallax[0]._id;
        if (req.file) {
          if (parallax[0].parallaxImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {
            if (await fs.existsSync(parallax[0].parallaxImageUrl.path)) await fs.unlinkSync(parallax[0].parallaxImageUrl.path);
            contentObj['parallaxImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        }

        await this.models.parallax.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        let newDB = await this.refreshDB(this.models.parallax);
        let imageUrl = {
          parallaxphoto: newDB.parallaxImageUrl.destination
        }
        return this.transDataWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', imageUrl, res);
      }
    } catch (error) {
      return this.serverError('Error in updateParallax method at homePagesController', 500, error, res);
    }

  }
  
  async updateHomeSlider(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {
        homeSlideritem1,
        homeSlidericonItem1,
        homeSlideritem2,
        homeSlidericonItem2,
        homeSlideritem3,
        homeSlidericonItem3,
      } = req.body;
      let contentObj = {
        homeSlideritem1,
        homeSlidericonItem1,
        homeSlideritem2,
        homeSlidericonItem2,
        homeSlideritem3,
        homeSlidericonItem3,
      };
      const homeSliderphoto = req.file;

      let homeSlider = await this.models.homeSlider.find({});
      let homeSliderCheck = await this.checkObj(homeSlider);
      if (!homeSliderCheck) {
        if (req.file) {
          contentObj['homeSliderImageUrl'] = {
            destination: await this.addressImage(homeSliderphoto),
            originalname: homeSliderphoto.originalname,
            path: homeSliderphoto.path
          }
        }
        let newHomeSlider = new this.models.homeSlider({ ...contentObj });
        
        newHomeSlider.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
          return this.izitoastMessage(['اطلاعات با موفقیت ذخیره شد'], 'success', res);
        });
      } else {
        let objId = homeSlider[0]._id;
        if (req.file) {
          if (homeSlider[0].homeSliderImageUrl.originalname === req.file.originalname) {
            await fs.unlinkSync(req.file.path);
          } else {;
            if (await fs.existsSync(homeSlider[0].homeSliderImageUrl.path)) await fs.unlinkSync(homeSlider[0].homeSliderImageUrl.path);
            contentObj['homeSliderImageUrl'] = {
              destination: await this.addressImage(req.file),
              originalname: req.file.originalname,
              path: req.file.path
            }
          }
        }

        await this.models.homeSlider.findByIdAndUpdate(objId, {
          $set: { ...contentObj,
            ...contentObj
          }
        });
        let newDB = await this.refreshDB(this.models.homeSlider);
        let imageUrl = {
          homeSliderphoto: newDB.homeSliderImageUrl.destination
        }
        return this.transDataWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', imageUrl, res);
      }
    } catch (error) {
      return this.serverError('Error in updateHomeSlider method at homePagesController', 500, error, res);
    }
  }

  async updateAbility(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {
        abilityitem1,
        abilityIconitem1,
        abilityDescitem1,
        abilityitem2,
        abilityIconitem2,
        abilityDescitem2,
        abilityitem3,
        abilityIconitem3,
        abilityDescitem3,
        abilityitem4,
        abilityIconitem4,
        abilityDescitem4,
        abilityitem5,
        abilityIconitem5,
        abilityDescitem5,
        abilityitem6,
        abilityIconitem6,
        abilityDescitem6
      } = req.body;
      let contentObj = {
        abilityitem1,
        abilityIconitem1,
        abilityDescitem1,
        abilityitem2,
        abilityIconitem2,
        abilityDescitem2,
        abilityitem3,
        abilityIconitem3,
        abilityDescitem3,
        abilityitem4,
        abilityIconitem4,
        abilityDescitem4,
        abilityitem5,
        abilityIconitem5,
        abilityDescitem5,
        abilityitem6,
        abilityIconitem6,
        abilityDescitem6
      };

      let ability = await this.models.ability.find({});
      let abilityCheck = await this.checkObj(ability);
      if (!abilityCheck) {
        let newAbility = new this.models.ability({ ...contentObj });
        newAbility.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
          return this.izitoastMessage(['اطلاعات با موفقیت ذخیره شد'], 'success', res);
        });
      } else {
        let objId = ability[0]._id;
        await this.models.ability.findByIdAndUpdate(objId, {
          $set: { ...contentObj,
            ...contentObj
          }
        });
        return this.izitoastMessage(['اطلاعات با موفقیت ذخیره شد'], 'success', res);
      }
    } catch (error) {
      return this.serverError('Error in updateHomeSlider method at homePagesController', 500, error, res);
    }
  }

}
