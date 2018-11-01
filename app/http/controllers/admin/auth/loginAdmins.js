const controller = require('../../controller');
const passport = require('passport');

class loginAdmins extends controller {
  async index(req , res , next) {
    try {
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      res.render('admin/auth/login' , {
        layout : 'home/master',
        title : 'ورود',
        siteInfo
      })
    } catch (error) {
      this.error('Error in render login page (index method)' , 500 , next);
    }
  };

  async loginProccess(req , res , next) {
    try {
      let recaptcha = await this.recaptchaValidation(req, res, next);
      if (!recaptcha) {
        return this.izitoastMessage(['گزینه امنیتی مربوط به شناسایی ربات خاموش است'], 'warning', res);
      }
      let result = await this.validationData(req, next);
      if (! result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      } else {
        return this.login(req , res , next);
      }
    } catch (error) {
      return this.serverError('Error in loginProccess Method at loginAdmins.js', 500, error, res);
    }
  };

  async registerProccess(req , res , next) {
    try {
      let recaptcha = await this.recaptchaValidation(req, res, next);
      if (!recaptcha) {
        return this.izitoastMessage(['گزینه امنیتی مربوط به شناسایی ربات خاموش است'], 'warning', res);
      }
      let result = await this.validationData(req, next);
      if(!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      } else {
        return this.register(req , res , next);
      }
    } catch (error) {
      return this.serverError('Error in registerProccess Method at loginAdmins.js', 500, error, res);
    }
  };

  async register(req , res , next) {
    try {
      passport.authenticate('admin.register', (error, newAdmin) => {
        if (error) return this.serverError('Error in Auth at register method', 500, error, res);
        if (!newAdmin) return this.izitoastMessage(req.flash('errors'), 'error', res);
        return this.izitoastMessage(['ثبت نام با موفقیت انجام شد'] , 'success', res);
      })(req, res, next);
    } catch (error) {
      return this.serverError('Error In register method', 500, error, res);
    }
  }

  async login(req, res, next) {
   try {
      passport.authenticate('admin.login', (error, admin) => {
        if (error) return this.serverError('Error in Auth at login method', 500, error, res);
        if (!admin) return this.izitoastMessage(['اطلاعات وارد شده صحیح نمی باشد'], 'warning', res);
        req.login(admin, error => {
          if (error) return this.serverError('Error in login at login method', 500, error, res);
          try {
            if (req.body.remember) {
              admin.setRememberToken(res);
            }
          } catch (error) {
            return this.serverError('Error In setRememberToken', 500, error, res);
          }
          return res.json({
            data   : {
              msg: ['در حال انتقال به پنل مدیریت'],
              method : 'success',
              redirect : '/admin/dashboard'
            },
            status : 'userError'
          })
        })
      })(req, res, next);
   } catch (error) {
     return this.serverError('Error In login method at loginAdmins', 500, error, res);
   }
  }
}

module.exports = new loginAdmins();