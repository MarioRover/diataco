const controller = require('../controller');

module.exports = new class contactController extends controller {
  async index(req, res, next) {
    try {
      let contactPage = await this.models.contactPage.find({});
      if (contactPage == '') {
        contactPage = 'undefined';
      } else {
        contactPage = contactPage[0];
      }
      res.render('home/contact', {
        title: 'درباره ما',
        contactPage
      });
    } catch (error) {
      this.error('Error in index Method at contactController.js' , 500 , next);
    }
  };

  async getMessage(req , res , next) {
    try {
      let recaptcha = await this.recaptchaValidation(req, res, next);
      if(!recaptcha) {
        return this.izitoastMessage(['گزینه امنیتی مربوط به شناسایی ربات خاموش است'], 'warning', res);
      }
      let result = await this.validationData(req , next);
      if(!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      } else {
        let {fullName , email , subject , description} = req.body;
        let newMessage = new this.models.Messages({fullName,email,subject,description});
        await newMessage.save((error) => {
          if (error) return this.serverError('Error in save Message at contactController.js', 500, error, res);
          return this.izitoastMessage(['پیام شما با موفقیت ارسال گردید'], 'success', res);
        });
      }
    } catch (error) {
      return this.serverError('Error in getMessage Method at contactController.js', 500, error, res);
    }
  };
}