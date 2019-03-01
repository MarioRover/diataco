const autoBind = require('auto-bind');
const axios = require('axios');
const isEmpty = require('is-empty');

module.exports = class controller {
  constructor() {
    autoBind(this);
    this.isEmpty = isEmpty;
  }
  async recaptchaValidation(req , res , next , token) {
    try {
      let data = await axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${token}`,
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
}