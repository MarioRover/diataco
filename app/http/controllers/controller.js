const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;

module.exports = class controller {
  constructor() {
    autoBind(this);
    this.recaptchaConfig();
  }
  async recaptchaConfig() {
    this.recaptcha = new Recaptcha(
      config.service.recaptcha.site_key,
      config.service.recaptcha.secret_key,
      {...config.service.recaptcha.options}
    );
  };
  async recaptchaValidation(req , res , next) {
    return new Promise((resolve, reject) => {
      this.recaptcha.verify(req, (error, data) => {
        if (error) {
          req.flash('errors', 'گزینه امنیتی مربوط به شناسایی روبات خاموش است');
          this.back(req, res);
        } else {
          resolve(true);
        } 
      })
    })
  };

  async adminInfo(req , res , next) {
    
  }
  // Method Helper
  back(req , res) {
    return res.redirect(req.header('Referer') || '/');
  }
  error(message , status = 500 , next) {
    try {
      let error = new Error(message);
      error.statusCode = status;
      throw error;
    } catch (error) {
      next(error);
    } 
  }
}