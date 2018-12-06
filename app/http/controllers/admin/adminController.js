const controller = require('./../controller');
const fs = require('fs');

module.exports = new class adminController extends controller {
  async index(req, res) {
    let messages = await this.models.Messages.find({});
    let user = req.user;    
    res.render('admin/dashboard' , {
      title : 'پنل مدیریت',
      activeRow: 'dashbaord',
      user,messages,
      manifest : this.Manifest
    });
  }

  async showProfileEdit(req , res , next) {
    let user = req.user;
    res.render('admin/profile/edit', {
      title: 'پنل مدیریت',
      activeRow: 'profileEdit',
      user,
      manifest : this.Manifest
    });
  }

  async profileEdit(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,family,newPass,replayNewPass} = req.body;
      let contentObj = {name , family};
      // Resize Image
      this.imageResize(req.file.path); 
      if(newPass !== '' || replayNewPass !== '') {
        if (newPass == '') return this.izitoastMessage(['فیلد رمز عبور جدید نمی تواند خالی باشد'], 'warning' , res);
        if (replayNewPass == '') return this.izitoastMessage(['فیلد تکرار رمز عبور جدید نمی تواند خالی باشد'], 'warning', res);
        if (newPass !== replayNewPass) return this.izitoastMessage(['فیلد های رمز عبور جدید باهم دیگر تطابق ندارند'], 'warning', res);
        if(newPass.length < 8) return this.izitoastMessage(['رمز عبور جدید نمی تواند کمتر از 8 کارکتر باشد'], 'warning', res);
        req.user.updatePassword(newPass);
      }


      let objId = req.user._id;
      let admin = req.user;
      if (req.file) {
        if (admin.profileImg.originalname === req.file.originalname) {
          await fs.unlinkSync(req.file.path);
        } else {
          if (await fs.existsSync(admin.profileImg.path)) await fs.unlinkSync(admin.profileImg.path);
          contentObj['profileImg'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
      }

      await this.models.Admins.findByIdAndUpdate(objId, {
        $set: { ...contentObj,...contentObj }
      });
      return this.redirectWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', '/admin/dashboard' , res);

    } catch (error) {
      return this.serverError('Error in profileEdit method at adminController', 500, error, res);
    }
  }

  async uploadImage(req, res, next) {
    let image = req.file;
    res.json({
      'uploaded': 1,
      'filename': image.originalname,
      'url': `${image.destination}/${image.filename}`.substring(8)
    })
  }

  async gallery(req, res, next) {
    try {
      let product = req.query.product;
      let slug = req.query.slug;
      let box = req.body.box;
      if(product == 'websites') {
        let website = await this.models.websites.findOne({slug : slug} , (error , website) => {
          if (error) return this.serverError('Error in find website in gallery method at adminController.js', 500, error, res);
          if (!website) return this.serverError('Error in find website in gallery method at adminController.js', 404, error, res);
          for(let i=1 ; i<=6 ; i++) {
            if(website[`image${i}`].path == box) {
              website[`image${i}`] = '';
              fs.unlinkSync(box);
              website.save();
            } 
          }
        })
      }
      if(product == 'applications') {
        let application = await this.models.applications.findOne({slug : slug} , (error , application) => {
          if (error) return this.serverError('Error in find application in gallery method at adminController.js', 500, error, res);
          if (!application) return this.serverError('Error in find application in gallery method at adminController.js', 404, error, res);
          for(let i=1 ; i<=6 ; i++) {
            if(application[`image${i}`].path == box) {
              application[`image${i}`] = '';
              fs.unlinkSync(box);
              application.save();
            } 
          }
        })
      }
    } catch (error) {
      return this.serverError('Error in gallery method at adminController', 500, error, res);
    }
  }
    
}
