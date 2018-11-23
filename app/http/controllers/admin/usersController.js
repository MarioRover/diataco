const controller = require('./../controller');
const fs = require('fs');

module.exports = new class usersController extends controller {
  async index(req, res , next) {
    try {
      let user = req.user;
      let webUsers = await this.models.webUsers.find({});
      if (this.isEmptyArray(webUsers)) {
        webUsers = 'undefined';
      }
      res.render('admin/users/index', {
        title: 'کاربران سایت',
        activeRow: 'users',
        user,webUsers
      });
    } catch (error) {
      this.error('Error in index method at usersController.js', 500, next);
    }
  }

  async showAddUser(req, res, next) {
    try {
      let user = req.user;
      res.render('admin/users/add', {
        title: 'کاربران سایت',
        activeRow: 'users',
        user
      });
    } catch (error) {
      this.error('Error in showAddUser method at usersController.js', 500, next);
    }
  }

  async createUser(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,job,telegram,whatsapp,website,email,instagram,facebook} = req.body;
      let contentObj = {
        name,job,telegram,whatsapp,website,email,instagram,facebook,
        imageUrl : {
          destination: this.addressImage(req.file),
          originalname: req.file.originalname,
          path: req.file.path
        },
        admin : req.user._id
      };

      let newUser = await this.models.webUsers({ ...contentObj});
      
      newUser.save(error => {
        if (error) {
          return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
        }
        return this.redirectWithMessage(['کاربر جدید با موفقیت ثبت گردید'], 'success', `/admin/users`, res);
      });
      

    } catch (error) {
      this.error('Error in createUser method at usersController.js', 500, next);
    }
  }

  async setBackground(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let webUsers = await this.models.webUsers.findById(req.params.user);
      let contentObj = {};
      let objId = webUsers._id;
      if (req.file && typeof webUsers.backgroundUrl !== 'undefined') {
        if (webUsers.backgroundUrl.originalname === req.file.originalname) {
          await fs.unlinkSync(req.file.path);
        } else {
          if (await fs.existsSync(webUsers.backgroundUrl.path)) await fs.unlinkSync(webUsers.backgroundUrl.path);
          contentObj['backgroundUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
      } else if (req.file && typeof webUsers.backgroundUrl == 'undefined') {
        contentObj['backgroundUrl'] = {
          destination: await this.addressImage(req.file),
          originalname: req.file.originalname,
          path: req.file.path
        }
      }
      await this.models.webUsers.findByIdAndUpdate(objId, {
        $set: { ...contentObj,
          ...contentObj
        }
      });
      return this.redirectWithMessage(['عکس پس زمینه با موفقیت بروز رسانی شد'], 'success', `/admin/users`, res);
      
    } catch (error) {
      return this.serverError('Error in setBackground method of usersController.js', 500, error, res);
    }
  }
    
  async removeUser(req , res , next) {
    try {
      req.body.forEach(async user => {
        await this.models.webUsers.findByIdAndDelete(user);
      });
      return this.deleteObj(['اطلاعات کاربر مورد نظر با موفقیت حذف گردید'] , 'success' , req.body , 'box' , res);
    } catch (error) {
      this.error('Error in removeUser method at usersController.js', 500, next);
    }
  }

  async showUpdateUser(req , res , next) {
    try {
      let result = await this.isMongoId(req.params.user, next);
      if (!result) {
        return this.error('Error in validate mongoid in showUpdateUser.js', 404, next);
      }
      let webUser = await this.models.webUsers.findById(req.params.user);
      let user = req.user;
      res.render('admin/users/user', {
        title: 'کاربران سایت',
        activeRow: 'users',
        user,webUser
      });
    } catch (error) {
      this.error('Error in showUpdateUser method at usersController.js', 500, next);
    }
  }

  async updateUser(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (req.file) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let webUser = await this.models.webUsers.findById(req.params.user);
      const {name,job,telegram,whatsapp,website,email,instagram,facebook} = req.body;
      let contentObj = {name,job,telegram,whatsapp,website,email,instagram,facebook};
      let objId = webUser._id;
      if (req.file && typeof webUser.imageUrl !== 'undefined') {
        if (webUser.imageUrl.originalname === req.file.originalname) {
          await fs.unlinkSync(req.file.path);
        } else {
          if (await fs.existsSync(webUser.imageUrl.path)) await fs.unlinkSync(webUser.imageUrl.path);
          contentObj['imageUrl'] = {
            destination: await this.addressImage(req.file),
            originalname: req.file.originalname,
            path: req.file.path
          }
        }
      } else if (req.file && typeof webUser.imageUrl == 'undefined') {
        contentObj['imageUrl'] = {
          destination: await this.addressImage(req.file),
          originalname: req.file.originalname,
          path: req.file.path
        }
      }
      await this.models.webUsers.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
      return this.redirectWithMessage(['اطلاعات کاربر با موفقیت بروز رسانی شد'], 'success', `/admin/users`, res);
    } catch (error) {
      return this.serverError('Error in setBackground method of usersController.js', 500, error, res);
    }
  }
}
