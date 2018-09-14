const controller = require('../controller');

module.exports = new class contactController extends controller {
  async index(req, res, next) {
    try {      
      res.render('home/contact', {
        title: 'دریاره ما',
        recaptcha: this.recaptcha.render(),
        errors: req.flash('errors')
      });
    } catch (error) {
      this.error('Error in index Method at contactController.js');
    }
  };
  async getMessage(req , res , next) {
    try {
      await this.recaptchaValidation(req, res, next);
      let result = await this.validationData(req , next);
      if(!result) {
        this.back(req,res);
      } else {
        let {fullName , email , subject , description} = req.body;
        let newMessage = new this.models.Messages({fullName,email,subject,description});
        await newMessage.save((error) => {
          if(error) return this.error('Error in save Message at contactController.js' , 500 , next);
          return res.json('message send');
        });
      }
    } catch (error) {
      this.error('Erron in getMessage Method at contactController.js' , next);
    }
  };
}