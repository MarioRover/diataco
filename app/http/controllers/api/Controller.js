const autoBind = require('auto-bind');
const isEmpty = require('is-empty');
const {validationResult} = require('express-validator/check');
// Models **
const Websites = require('app/models/websites');
const Apps = require('app/models/applications');

module.exports = class Controller {
  constructor() {
    autoBind(this);
    this.isEmpty = isEmpty;
    this.models = {
      Websites,Apps
    }
  }

  async validationData(req , res , next) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = result.array();
        const messages = [];
        errors.forEach(err => messages.push(err.msg));
        this.error(messages , res , 403);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      this.error(error.message , res);
    }
  }

  error(msg , res , StCode = 500) {
    res.status(StCode).json({
      data : msg,
      status : 'error',
      statusCode : StCode
    })
  }
}