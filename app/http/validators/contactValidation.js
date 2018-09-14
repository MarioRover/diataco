const validator = require('./validator');
const {check} = require('express-validator/check');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('fullName')
        .not().isEmpty()
        .withMessage('فیلد نام نمی تواند خالی باشد'),
      check('email')
        .not().isEmpty()
        .withMessage('فیلد ایمیل نمی تواند خالی باشد'),
      check('email')
      .isEmail()
      .withMessage('فرمت ایمیل وارد شده صحیح نمی باشد'),
      check('subject')
        .not().isEmpty()
        .withMessage('فیلد شماره تماس نمی تواند خالی باشد'),
      check('description')
        .not().isEmpty()
        .withMessage('فیلد توضیحات نمی تواند خالی باشد'),
    ]
  }
}