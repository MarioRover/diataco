const validator = require('./validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class siteInfoValidation extends validator {
  handle() {
    return [
      check('nameEn')
        .not().isEmpty()
        .withMessage('فیلد نام وب سایت لاتین نمی تواند خالی باشد'),
      check('nameFa')
        .not().isEmpty()
        .withMessage('فیلد نام وب سایت فارسی نمی تواند خالی باشد'),  
      check('logoVal')
      .custom(async (value, {req}) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر لوگو الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر لوگو الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      })
    ]
  }
}