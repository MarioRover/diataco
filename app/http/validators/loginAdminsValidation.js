const validator = require('./validator');
const {check} = require('express-validator/check');
const isEmail = require('validator/lib/isEmail');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('email')
        .custom(async (value , {req}) => {
          if (!value) throw new Error('فیلد ایمیل نمی تواند خالی باشد');
          if (!isEmail(value)) throw new Error('فرمت ایمیل وارد شده صحیح نمی باشد');
        }),
      check('password')
        .not().isEmpty()
        .withMessage('فیلد رمز عبور نمی تواند خالی باشد'),
    ]
  }
}