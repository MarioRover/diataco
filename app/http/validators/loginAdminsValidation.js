const validator = require('./validator');
const {check} = require('express-validator/check');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('email')
        .not().isEmpty()
        .withMessage('فیلد ایمیل نمی تواند خالی باشد'),
      check('email')
      .isEmail()
      .withMessage('فرمت ایمیل وارد شده صحیح نمی باشد'),
      check('password')
        .not().isEmpty()
        .withMessage('فیلد رمز عبور نمی تواند خالی باشد'),
    ]
  }
}