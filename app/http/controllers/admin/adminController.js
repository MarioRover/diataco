const controller = require('./../controller');
const fs = require('fs');

class adminController extends controller {
  index(req, res) {
    let user = req.user;    
    res.render('admin/dashboard' , {
      title : 'پنل مدیریت',
      activeRow: 'dashbaord',
      user
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
          console.log('here');
          if (admin.profileImg.destination !== '/uploads/images/2018/9/28/IMG_6456.JPG') {
            await fs.unlinkSync(admin.profileImg.path);
          }
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
      let newAdmin = await this.models.Admins.findById(admin._id);
      let imageUrl = newAdmin.profileImg.destination;
      return this.transDataWithMessage(['تغییرات با موفقیت ثبت گردید'], 'success', imageUrl, res);

    } catch (error) {
      return this.serverError('Error in profileEdit method at adminController', 500, error, res);
    }
  }
    
}

module.exports = new adminController();