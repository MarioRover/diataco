const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const {validationResult} = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');
// Models
const Messages = require('app/models/messages');
const Admins = require('app/models/admin');
const contactPage = require('app/models/contactPage');

module.exports = class controller {
  constructor() {
    autoBind(this);
    this.recaptchaConfig();
    this.models = {Admins , Messages , contactPage};
  }
  async recaptchaConfig() {
    this.recaptcha = new Recaptcha(
      config.service.recaptcha.site_key,
      config.service.recaptcha.secret_key,
      {...config.service.recaptcha.options}
    );
  };
  async recaptchaValidation(req , res , next) {
    try {
      if (!req.body.recaptcha) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return this.serverError('Error in recaptchaValidation Method at controller.js', 500, error, res);
    }
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
      return this.serverError('Error in validationData Method at controller.js', 500, error, res);
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
      return this.serverError('Error in isMongoId Method at controller.js', 500, error, res);
    }
  }
  addressImage(image) {
    return this.getUrlImage(`${image.destination}/${image.filename}`);
  }
  // Method Helper


  izitoastMessage(msg,method,res) {
    try {
      res.json({
      data   : {msg,method},
      status : 'userError'
      });
    } catch (error) {
      return this.serverError('Error in izitoastMessage Method at controller.js', 500, error, res);
    }
  }


  async back(req , res) {
    return res.redirect(req.header('Referer') || '/');
  }
  async error(message , status = 500 , next) {
    try {
      let error = new Error(message);
      error.statusCode = status;
      throw error;
    } catch (error) {
      next(error);
    } 
  }
  serverError(msg,statusCode, error, res) {
    res.json({
      data   : {
        msg,
        statusCode,
        stack : error.stack,
        debug : config.debug
      },
      status : 'serverError'
    })
  }
  deleteObj(msg, method, objId , actionDel , res) {
    res.json({
      data: {
        msg,
        method,
        objId,
        actionDel
      },
      status: 'deleteObj'
    })
  }
  getUrlImage(dir) {
    return dir.substring(8);
  }
}