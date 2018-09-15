const controller = require('../../controller');
const passport = require('passport');

class loginAdmins extends controller {
  async index(req , res , next) {
    try {
      res.render('admin/auth/login' , {
        layout : 'home/master',
        recaptcha: this.recaptcha.render(),
        title : 'ورود',
        izitoast: this.izitoast('warning', req.flash('errors'))
      })
    } catch (error) {
      this.error('Error in render login page (index method)' , 500 , next);
    }
  };

  async loginProccess(req , res , next) {
    try {
      await this.recaptchaValidation(req, res, next);
      let result = await this.validationData(req, next);
      if (! result) {
        this.back(req, res);
      } else {
        return this.login(req , res , next);
      }
    } catch (error) {
      this.error('Error In Recaptcha Validation' , 500 , next);
    }
  };

  async registerProccess(req , res , next) {
    try {
      await this.recaptchaValidation(req, res, next);
      let result = await this.validationData(req, next);
      if(!result) {
        this.back(req, res);
      } else {
        return this.register(req , res , next);
      }
    } catch (error) {
      this.error('Error In Recaptcha Validation', 500, next);
    }
  };

  async register(req , res , next) {
    try {
      passport.authenticate('admin.register', {
        successRedirect: '/',
        failureRedirect: '/admin',
        failureFlash: true
      })(req, res, next);
    } catch (error) {
      this.error('Error In register method', 500, next);
    }
  }

  async login(req, res, next) {
   try {
      passport.authenticate('admin.login', (error, admin) => {
        if(error) return this.error('Error in Auth at login method',500,next);
        if (!admin) return this.back(req, res);
        req.login(admin, error => {
          if(error) return this.error('Error in login ar login method',500,next);
          try {
            if (req.body.remember) {
              admin.setRememberToken(res);
            }
          } catch (error) {
            this.error('Error In setRememberToken', 500, next);
          }
          return res.redirect('/admin/dashboard');
        })
      })(req, res, next);
   } catch (error) {
     this.error('Error In login method', 500, next);
   }
  }
}

module.exports = new loginAdmins();