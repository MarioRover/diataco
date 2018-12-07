const controller = require('../controller');

module.exports = new class contactController extends controller {
  async index(req, res, next) {
    try {
      let contactPage = await this.models.contactPage.find({});
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmpty(contactPage)) {
        contactPage = 'undefined';
      } else {
        contactPage = contactPage[0];
      }
      res.render('home/contact', {
        title: 'Contact of Diata&#x2122; | تماس با دیاتا',
        contactPage,siteInfo,
        SITEKEY : process.env.RECAPTCHA_SITEKEY,
        descTags : contactPage.descTags,
        keyTags : contactPage.keyTags,
        manifest : this.Manifest
      });
    } catch (error) {
      this.error('Error in index Method at contactController.js' , 500 , next);
    }
  };

  async getMessage(req , res , next) {
    try {
      let recaptcha = await this.recaptchaValidation(req, res, next);
      if(!recaptcha) {
        return this.izitoastMessage(['شناسایی ربات : لطفا صفحه را بارگیری مجدد کنید'], 'warning', res);
      }
      let result = await this.validationData(req , next);
      if(!result) {
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      } else {
        this.escapeAndTrim(req, 'fullName email subject description');
        let {fullName , email , subject , description} = req.body;
        let newMessage = new this.models.Messages({fullName,email,subject,description});
        await newMessage.save((error) => {
          if (error) return this.serverError('Error in save Message at contactController.js', 500, error, res);
          return this.redirectWithMessage(['پیام شما با موفقیت ارسال گردید'], 'success', '/' , res);
        });
      }
    } catch (error) {
      return this.serverError('Error in getMessage Method at contactController.js', 500, error, res);
    }
  };
}