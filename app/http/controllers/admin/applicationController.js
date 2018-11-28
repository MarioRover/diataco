const controller = require('./../controller');
const fs = require('fs');
const isEmptyObject = require('is-empty-object');

module.exports = new class applicationController extends controller {
  async index(req, res, next) {
     try {
       let user = req.user;
       let page = req.query.page || 1;
       let applications = await this.models.applications.paginate({}, {
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
       if (isEmptyObject(applications)) {
         applications = 'undefined';
       }
       res.render('admin/application/index', {
         title: 'اپلیکیشن',
         activeRow: 'applications',
         user,
         applications
       });
     } catch (error) {
       return this.error('Error in index method at applicationController.js', 500, next);
     }
  };

  async indexAdd(req, res, next) {
    try {
      let user = req.user;
      res.render('admin/application/add', {
        title: 'اپلیکیشن',
        activeRow: 'applications',
        user
      });
    } catch (error) {
      return this.serverError('Error in indexAdd method at applicationController.js', 500, error, res);
    }
  };

  async addApplication(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!isEmptyObject(req.files)) {
          fs.unlinkSync(req.files['logo'][0].path);
          fs.unlinkSync(req.files['previewImage'][0].path);
          if(!this.isEmptyArray(req.files['images'])) {
            req.files['images'].forEach(image => {
              fs.unlinkSync(image.path);
            })
          }
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,link,slug,desc,appstore,sibapp,googleplay,cafebazar} = req.body;
      const logo = req.files['logo'][0];
      const previewImage = req.files['previewImage'][0];
      const wallpaper = req.files['wallpaper'][0];
      // Resize Image
      this.imageResize(previewImage.path);
      // Check Slug
      let applicationDuplicate = {
        slug : await this.models.applications.find({ slug: slug } , (error , application) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return application;
        }),
        name : await this.models.applications.find({ name: name } , (error , application) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return application;
        })
      }
      let message = [];
      if (!this.isEmptyArray(applicationDuplicate.slug)) message.push('اسلاگ اپلیکیشن وارد شده قبلا ثبت شده است');
      if (!this.isEmptyArray(applicationDuplicate.name)) message.push('نام اپلیکیشن وارد شده قبلا ثبت شده است');
      if (!this.isEmptyArray(message)) {
        if (!isEmptyObject(req.files)) {
          fs.unlinkSync(logo.path);
          fs.unlinkSync(previewImage.path);
          fs.unlinkSync(wallpaper.path);
          req.files["images"].forEach(image => {
            fs.unlinkSync(image.path);
          });
        }
        return this.izitoastMessage(message, 'warning', res);
      } else {
        let contentObj = {name,link,slug,desc,appstore,sibapp,googleplay,cafebazar,admin : req.user._id};
        contentObj['logo'] = {
          destination: this.addressImage(logo),
          originalname: logo.originalname,
          path: logo.path
        }
        contentObj['previewImage'] = {
          destination: this.addressImage(previewImage),
          originalname: previewImage.originalname,
          path: previewImage.path
        }
        contentObj['wallpaper'] = {
          destination: this.addressImage(wallpaper),
          originalname: wallpaper.originalname,
          path: wallpaper.path
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
        let newApplication = new this.models.applications({ ...contentObj });
        newApplication.save(error => {
          if (error) {
            return this.serverError("ذخیره اطلاعات با مشکل مواجه شد", 500, error, res);
          }
          return this.redirectWithMessage(['اپلیکیشن با موفقیت ثبت گردید'], 'success', '/admin/applications', res);
        });
        
      }
    } catch (error) {
      return this.serverError('Error in addApplication method at applicationController.js', 500, error, res);
    }
  };

  async removeApplication(req, res, next) {
    try {
      let result = await this.isMongoId(req.body.application, next);
      if (!result) {
        return this.serverError('Error in validate mongoid in applicationController.js', 403, error, res);
      }
      let application = await this.models.applications.findById(req.body.application, (error, application) => {
        if (error) return this.serverError('Error in find message in removeApplication method at applicationController.js', 500, error, res);
        if (!application) return this.serverError('not found message in removeApplication method at applicationController.js', 404, error, res);
        return application;
      });
      await fs.unlinkSync(application['logo'].path);
      await fs.unlinkSync(application['previewImage'].path);
      await fs.unlinkSync(website['wallpaper'].path);
      for (let i = 1; i <= 6; i++) {
        if (application[`image${i}`] !== '') {
          await fs.unlinkSync(application[`image${i}`].path);
        }
      }
      application.remove();
      return this.deleteObj([' اپلیکیشن با موفقیت حذف گردید'], 'success', req.body.application, 'row', res);
    } catch (error) {
      return this.serverError('Error in removeApplication method at applicationController.js', 500, error, res);
    }
  }

  async application(req, res, next) {
    try {
      let application = await this.models.applications.find({ slug: req.params.application }).populate({
        path : 'admin',
        select : 'name , family'
      }).populate({
        path: 'updatedBy',
        select: 'name , family'
      }).exec();
      if (this.isEmptyArray(application)) return this.error('Error in find application in applicationController.js', 404, next);
      let user = req.user;
      // return res.json(application[0]);
      res.render('admin/application/application', {
        title: 'وب سایت',
        activeRow: 'applications',
        user,
        application : application[0]
      });
    } catch (error) {
      return this.error('Error in application method at applicationController.js', 500, next);
    }
  };

  async updateApplication(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!isEmptyObject(req.files)) {
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
      const {name,link,slug,desc,appstore,sibapp,googleplay,cafebazar} = req.body;
      let thisApplication = await this.models.applications.find({ slug: req.params.application } , (error , application) => {
        if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
        return application;
      });
      
      let applicationDuplicate = {
        slug : await this.models.applications.find({ slug: slug } , (error , application) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return application;
        }),
        name : await this.models.applications.find({ name: name } , (error , application) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return application;
        })
      }
      
      let message = [];
      if (!this.isEmptyArray(applicationDuplicate.slug)) {
        if (String(applicationDuplicate.slug[0]._id) !== String(thisApplication[0]._id)) {
          message.push('اسلاگ وب سایت وارد شده قبلا ثبت شده است');
        }
      }
      if (!this.isEmptyArray(applicationDuplicate.name)) {
        if (String(applicationDuplicate.name[0]._id) !== String(thisApplication[0]._id)) {
          message.push('نام وب سایت وارد شده قبلا ثبت شده است');
        }
      }
      
      if (!this.isEmptyArray(message)) {
        if (!isEmptyObject(req.files)) {
          fs.unlinkSync(req.files['logo'][0].path);
          fs.unlinkSync(req.files['previewImage'][0].path);
          fs.unlinkSync(req.files['wallpaper'][0].path);
          req.files['images'].forEach(image => {
            fs.unlinkSync(image.path);
          })
        }
        return this.izitoastMessage(message, 'warning', res);
      } else {
        let contentObj = {name,link,slug,desc,appstore,sibapp,googleplay,cafebazar,admin : req.user._id};
        let logo,previewImage,images,wallpaper;
        if(!this.isEmpty(req.files)) {
          if (!this.isEmptyArray(req.files['logo'])) {
            logo = req.files['logo'][0];
            if (thisApplication[0].logo.originalname === logo.originalname) {
              await fs.unlinkSync(logo.path);
            } else {
              if (await fs.existsSync(thisApplication[0].logo.path)) await fs.unlinkSync(thisApplication[0].logo.path);
              contentObj["logo"] = { 
                destination: this.addressImage(logo),
                originalname: logo.originalname,
                path: logo.path };
              }
            }
            
            if (!this.isEmptyArray(req.files['previewImage'])) {
              previewImage = req.files['previewImage'][0];
              if (thisApplication[0].previewImage.originalname === previewImage.originalname) {
                await fs.unlinkSync(previewImage.path);
              } else {
                if (await fs.existsSync(thisApplication[0].previewImage.path)) await fs.unlinkSync(thisApplication[0].previewImage.path);
                // Resize image
                this.imageResize(previewImage.path);
                //
                contentObj["previewImage"] = {
                  destination: this.addressImage(previewImage),
                  originalname: previewImage.originalname,
                  path: previewImage.path
                };
              }
            }

            if (!this.isEmptyArray(req.files['wallpaper'])) {
              wallpaper = req.files['wallpaper'][0];
              if (thisApplication[0].wallpaper.originalname === wallpaper.originalname) {
                await fs.unlinkSync(wallpaper.path);
              } else {
                if (await fs.existsSync(thisApplication[0].previewImage.path)) await fs.unlinkSync(thisApplication[0].wallpaper.path);
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
                if (thisApplication[0][`image${i}`] !== '') {
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
          await this.models.applications.findByIdAndUpdate(thisApplication[0]._id, {
            $set: { ...contentObj, ...contentObj }
          });
          return this.redirectWithMessage(["تغییرات با موفقیت ثیت گردید"], "success", `/admin/applications`, res);
          
        }
      } catch (error) {
      return this.serverError('Error in updateApplication method of applicationController.js', 500, error, res);
    }
  } 
}  