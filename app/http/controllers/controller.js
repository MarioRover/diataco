const autoBind = require('auto-bind');
const {validationResult} = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');
const axios = require('axios');
const isEmpty = require('is-empty');
const Jimp = require('jimp');
const Manifest = require('../../../public/dist/manifest.json');
// Models
const Messages = require('app/models/messages');
const Admins = require('app/models/admin');
const contactPage = require('app/models/contactPage');
const homePage = require('app/models/homePage');
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
    this.isEmpty = isEmpty;
    this.Manifest = Manifest;
    this.models = {
      Admins,
      Messages,
      contactPage,
      homePage,
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
      let data = await axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${req.body.recaptcha}`,
      })
      if(!isEmpty(data.data['error-codes']) && data.data['error-codes'] == 'timeout-or-duplicate') {
          return true;
      } else if(data.data.success) {
          return true;
      } else {
          return false
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

  async debug() {
    let info = await this.models.siteInfo.find({});
    if(!isEmpty(info)) return info[0].debug;
    return true;
  }

  imageResize(imagePath) {
    Jimp.read(imagePath , (err , image) => {
      if(err) console.log(err);
      image
        .resize(480 , Jimp.AUTO)
        .quality(70)
        .writeAsync(imagePath);
    })
  }
  
  getUrlImage(dir) {
    return dir.substring(8);
  }
}