const controller = require('./controller');

module.exports = new class recaptchaController extends controller {
  async get(req, res , next) {
    try {
      console.log(req.body);
      res.json({
          data : {
            recaptcha : {
                data : '12456789',
                status : 'success'
            }
          },
          status : true
      })
    } catch (error) {
      res.json({
          data : 'Error 500',
          status : false
      })
    }
  };
  async post(req , res , next) {
    try {
      let recaptcha = await this.recaptchaValidation(req, res, next , req.body.token);
      if(!recaptcha) {
        return res.json({
          status : 'success',
          data : {
            recaptcha : true
          }
        })
      } else {
        return res.json({
          status : 'success',
          data : {
            recaptcha : false
          }
        })
      }
      
    } catch (error) {
      res.json({
        status : false,
        data : {
          errorCode : 500
        }
        
      })
    }
  }  
}
