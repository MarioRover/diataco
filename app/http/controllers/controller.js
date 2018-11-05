const autoBind = require('auto-bind');
const {validationResult} = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');
// Models
const Messages = require('app/models/messages');
const Admins = require('app/models/admin');
const contactPage = require('app/models/contactPage');
const aboutUs = require('app/models/homePageSetting/aboutUs');
const parallax = require('app/models/homePageSetting/parallax');
const homeSlider = require('app/models/homePageSetting/homeSlider');
const ability = require('app/models/homePageSetting/ability');
const blogCategory = require('app/models/blog/categories');
const blog = require('app/models/blog/blog');
const aboutPage = require('app/models/aboutPage');
const webUsers = require('app/models/webUsers');
const seoPage = require('app/models/seoPage');
const websites = require('app/models/websites');
const applications = require('app/models/applications');
const siteInfo = require('app/models/siteInfo');
const websitePage = require('app/models/websitePage');
const applicationPage = require('app/models/applicationPage');

module.exports = class controller {
  constructor() {
    autoBind(this);
    this.models = {
      Admins,
      Messages,
      contactPage,
      aboutUs,
      parallax,
      homeSlider,
      ability,
      blogCategory,
      blog,
      aboutPage,
      webUsers,
      seoPage,
      websites,
      applications,
      siteInfo,
      websitePage,
      applicationPage
    };
  }
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
  async refreshDB(DB) {
    let newDB = await DB.find({});
    return newDB[0];
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

  async checkObj(obj) {
    return Object.keys(obj).length !== 0;
  }

  isEmptyArray(array) {
    if (!Array.isArray(array) || !array.length) {
      // array does not exist, is not an array, or is empty
      return true;
    } else {
      return false;
    }
  }

  transDataWithMessage(msg , method , transfer , res) {
    res.json({
      data : {
        msg,
        method,
        transfer : {
          imageUrl : transfer
        }
      },
      status: 'transData'
    })
  }

  redirectWithMessage(msg, method, href, res) {
    res.json({
      data: {
        msg,
        method,
        href
      },
      status: 'redirect'
    })
  }
  
  getUrlImage(dir) {
    return dir.substring(8);
  }

  async getDate() {
    let d = new Date();
    return `${d.getFullYear()}.${d.getMonth()}.${d.getDate()}`;
  }
  async getTime() {
    let d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }

  escapeAndTrim(req, items) {
    items.split(' ').forEach(item => {
      req.sanitize(item).escape();
      req.sanitize(item).trim();
    });
  }
}