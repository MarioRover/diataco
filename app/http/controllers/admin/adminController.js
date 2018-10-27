const controller = require('./../controller');
const fs = require('fs');

class adminController extends controller {
  async index(req, res) {
    let messages = await this.models.Messages.find({});
    let user = req.user;    
    res.render('admin/dashboard' , {
      title : 'پنل مدیریت',
      activeRow: 'dashbaord',
      user,messages
    });
  }

  async showProfileEdit(req , res , next) {
    let user = req.user;
    res.render('admin/profile/edit', {
      title: 'پنل مدیریت',
      activeRow: 'profileEdit',
      user
    });
  }

  async profileEdit(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name , family} = req.body;
      let contentObj = {name , family};
      let objId = req.user._id;
      let admin = {};
      await this.models.Admins.findById(req.user._id , (err , user) => {
        if (err) return this.serverError('Error in find user at adminController', 500, error, res);
        if(!user) return this.serverError('Error in find user at adminController', 500, error, res);
        admin = user;      
      });
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
        $set: { ...contentObj,
          ...contentObj
        }
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

module.exports = new adminController();