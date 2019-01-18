const controller = require('../controller');

module.exports = new class recaptchaController extends controller {
  async index(req, res , next) {
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
    
}
