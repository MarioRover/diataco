const controller = require('./../controller');
const fs = require('fs');


module.exports = new class websiteController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let page = req.query.page || 1;
      let websites = await this.models.websites.paginate({}, {
        page,
        sort: {
          createdAt: -1
        },
        limit: 10,
        populate: {
          path: 'admin',
          select: 'name , family'
        },
      });
      if (this.isEmpty(websites)) {
        websites = 'undefined';
      } 
      res.render('admin/websites/index', {
        title: 'وب سایت',
        activeRow: 'websites',
        user,websites,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in index method at websiteController.js', 500, next);
    }
  };
  async indexAdd(req, res, next) {
    try {
      let user = req.user;
      res.render('admin/websites/add', {
        title: 'وب سایت',
        activeRow: 'websites',
        user,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.serverError('Error in indexAdd method at websiteController.js', 500, error, res);
    }
  };
  async addWebsite(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.files)) {
          fs.unlinkSync(req.files['logo'][0].path);
          fs.unlinkSync(req.files['previewImage'][0].path);
          fs.unlinkSync(req.files['wallpaper'][0].path);
          if(!this.isEmptyArray(req.files['images'])) {
            req.files['images'].forEach(image => {
              fs.unlinkSync(image.path);
            })
          }
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,link,slug,desc} = req.body;
      const logo = req.files['logo'][0];
      const previewImage = req.files['previewImage'][0];
      const wallpaper = req.files['wallpaper'][0];
      // Resize Image
      this.imageResize(previewImage.path);
      // Check Slug
      let websiteDuplicate = {
        slug : await this.models.websites.find({ slug: slug } , (error , website) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return website;
        }),
        name : await this.models.websites.find({ name: name } , (error , website) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return website;
        })
      }
      let message = [];
      if (!this.isEmptyArray(websiteDuplicate.slug)) message.push('اسلاگ وب سایت وارد شده قبلا ثبت شده است');
      if (!this.isEmptyArray(websiteDuplicate.name)) message.push('نام وب سایت وارد شده قبلا ثبت شده است');
      if (!this.isEmptyArray(message)) {
        if (!this.isEmpty(req.files)) {
          fs.unlinkSync(logo.path);
          fs.unlinkSync(previewImage.path);
          fs.unlinkSync(wallpaper.path);
          req.files['images'].forEach(image => {
            fs.unlinkSync(image.path);
          })
        }
        return this.izitoastMessage(message, 'warning', res);
      } else {
        let contentObj = {name,link,slug,desc,admin : req.user._id};
        contentObj['logo'] = {
          destination: this.addressImage(logo),
          originalname: logo.originalname,
          path: logo.path
        }
        contentObj['wallpaper'] = {
          destination: this.addressImage(wallpaper),
          originalname: wallpaper.originalname,
          path: wallpaper.path
        }
        contentObj['previewImage'] = {
          destination : this.addressImage(previewImage),
          originalname: previewImage.originalname,
          path : previewImage.path
        }
        let i = 1;
        req.files['images'].forEach(image => {
          contentObj[`image${i}`] = {
            destination: this.addressImage(image),
            originalname: image.originalname,
            path: image.path
          }
          i++;
        });
        
        let newWebsite = new this.models.websites({ ...contentObj });
        newWebsite.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
          return this.redirectWithMessage([' وب سایت با موفقیت ثبت گردید'], 'success', '/admin/websites', res);
        });
      }
    } catch (error) {
      return this.serverError('Error in addWebsite method at websiteController.js', 500, error, res);
    }
  };
  async website(req, res, next) {
    try {
      let website = await this.models.websites.find({ slug: req.params.website }).populate({
        path : 'admin',
        select : 'name , family'
      }).populate({
        path: 'updatedBy',
        select: 'name , family'
      }).exec();
      if (this.isEmptyArray(website)) return this.error('Error in find website in websiteController.js', 404, next);
      let user = req.user;
      // return res.json(website[0]);
      res.render('admin/websites/website', {
        title: 'وب سایت',
        activeRow: 'websites',
        user,
        website : website[0],
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in website method at websiteController.js', 500, next);
    }
  };
  async removeWebsite(req, res, next) {
    try {
      let result = await this.isMongoId(req.body.website, next);
      if (!result) {
        return this.serverError('Error in validate mongoid in websiteController.js', 403, error, res);
      }
      let website = await this.models.websites.findById(req.body.website, (error, website) => {
        if (error) return this.serverError('Error in find message in deleteWebsite method at websiteController.js', 500, error, res);
        if (!website) return this.serverError('not found message in deleteWebsite method at websiteController.js', 404, error, res);
        return website;
      });
      await fs.unlinkSync(website['logo'].path);
      await fs.unlinkSync(website['previewImage'].path);
      await fs.unlinkSync(website['wallpaper'].path);
      for(let i=1; i <=6 ; i++) {
        if(website[`image${i}`] !== '') {
          await fs.unlinkSync(website[`image${i}`].path);
        }
      }
      website.remove();
      return this.deleteObj(['وب سایت با موفقیت حذف گردید'], 'success', req.body.website, 'row', res);
    } catch (error) {
      return this.serverError('Error in deleteBlog method at websiteController.js', 500, error, res);
    }
  }
  async updateWebsite(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.files)) {
          fs.unlinkSync(req.files['logo'][0].path);
          fs.unlinkSync(req.files['previewImage'][0].path);
          fs.unlinkSync(req.files['wallpaper'][0].path);
          if(!this.isEmptyArray(req.files['images'])) {
            req.files['images'].forEach(image => {
              fs.unlinkSync(image.path);
            })
          }
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,link,slug,desc} = req.body;
      
      let thiswebsite = await this.models.websites.find({ slug: req.params.website } , (error , website) => {
        if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
        return website;
      });

      let websiteDuplicate = {
        slug : await this.models.websites.find({ slug: slug } , (error , website) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return website;
        }),
        name : await this.models.websites.find({ name: name } , (error , website) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return website;
        })
      }

      let message = [];
      if (!this.isEmptyArray(websiteDuplicate.slug)) {
        if (String(websiteDuplicate.slug[0]._id) !== String(thiswebsite[0]._id)) {
          message.push('اسلاگ وب سایت وارد شده قبلا ثبت شده است');
        }
      }
      if (!this.isEmptyArray(websiteDuplicate.name)) {
        if (String(websiteDuplicate.name[0]._id) !== String(thiswebsite[0]._id)) {
          message.push('نام وب سایت وارد شده قبلا ثبت شده است');
        }
      }

      if (!this.isEmptyArray(message)) {
        if (this.checkObj(req.files)) {
          fs.unlinkSync(req.files['logo'][0].path);
          fs.unlinkSync(req.files['previewImage'][0].path);
          fs.unlinkSync(req.files['wallpaper'][0].path);
          req.files['images'].forEach(image => {
            fs.unlinkSync(image.path);
          })
        }
        return this.izitoastMessage(message, 'warning', res);
      } else {
        let contentObj = {name,link,slug,desc,updatedBy : req.user._id};
        let logo,previewImage,images,wallpaper;
        if(!this.isEmpty(req.files)) {
          if (!this.isEmptyArray(req.files['logo'])) {
            logo = req.files['logo'][0];
            if (thiswebsite[0].logo.originalname === logo.originalname) {
              await fs.unlinkSync(logo.path);
            } else {
              if (await fs.existsSync(thiswebsite[0].logo.path)) await fs.unlinkSync(thiswebsite[0].logo.path);
              contentObj["logo"] = { 
                destination: this.addressImage(logo),
                originalname: logo.originalname,
                path: logo.path };
            }
          }

          if (!this.isEmptyArray(req.files['previewImage'])) {
            previewImage = req.files['previewImage'][0];
            if (thiswebsite[0].previewImage.originalname === previewImage.originalname) {
              await fs.unlinkSync(previewImage.path);
            } else {
              if (await fs.existsSync(thiswebsite[0].previewImage.path)) await fs.unlinkSync(thiswebsite[0].previewImage.path);
              // Resize image
              this.imageResize(previewImage.path);
              //
              contentObj['previewImage'] = {
                destination : this.addressImage(previewImage),
                originalname: previewImage.originalname,
                path : previewImage.path
              }
            }
          }

          if (!this.isEmptyArray(req.files['wallpaper'])) {
            wallpaper = req.files['wallpaper'][0];
            if (thiswebsite[0].wallpaper.originalname === wallpaper.originalname) {
              await fs.unlinkSync(wallpaper.path);
            } else {
              if (await fs.existsSync(thiswebsite[0].previewImage.path)) await fs.unlinkSync(thiswebsite[0].wallpaper.path);
              contentObj["wallpaper"] = {
                destination: this.addressImage(wallpaper),
                originalname: wallpaper.originalname,
                path: wallpaper.path
              };
            }
          }
          
          if (!this.isEmptyArray(req.files['images'])) {
            let number = 1;
            for (let i = 1; i <= 6; i++) {
              if (thiswebsite[0][`image${i}`] !== '') {
                number++;
              }
            }
            images = req.files['images'];
            images.forEach(image => {
              contentObj[`image${number}`] = {
                destination: this.addressImage(image),
                originalname: image.originalname,
                path: image.path
              }
              number++;
            });
          }  

        }
        await this.models.websites.findByIdAndUpdate(thiswebsite[0]._id, {
          $set: { ...contentObj, ...contentObj }
        });
        return this.redirectWithMessage(["تغییرات با موفقیت ثیت گردید"], "success", `/admin/websites`, res);
          
      }
    } catch (error) {
      return this.serverError('Error in updateWebsite method of websiteController.js', 500, error, res);
    }
  }
}
