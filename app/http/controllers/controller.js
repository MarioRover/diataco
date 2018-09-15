const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const {validationResult} = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');
// Models
const Messages = require('app/models/messages');
const Admins = require('app/models/admin');

module.exports = class controller {
  constructor() {
    autoBind(this);
    this.recaptchaConfig();
    this.models = {Admins , Messages};
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
  async validationData(req , res , next) {
    try {
      const result = validationResult(req);
      if(!result.isEmpty()) {
        const errors  = result.array();
        const messages = [];
        errors.forEach(err => messages.push(err.msg));
        req.flash('errors' , messages);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      this.error('Error in ValidationData in Controller.js' , 422 , next);
    }
  }
  async isMongoId(paramId , next) {
    try {
      if(! isMongoId(paramId)) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      this.error('Error in validate mongoid in controller.js' , 500 , next);
    }
  }
  // Method Helper
  izitoast(method , messages) {
    return {
      method,
      messages
    }
  }
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