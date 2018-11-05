const validator = require('./validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class appPageValidation extends validator {
  handle() {
    return [
      check('title')
        .not().isEmpty()
        .withMessage('فیلد تیتر صفحه اپلیکیشن نمی تواند خالی باشد'),
      check('desc')
        .not().isEmpty()
        .withMessage('فیلد متن صفحه اپلیکیشن نمی تواند خالی باشد'),

      check('backgroundVal')
      .custom(async (value, {req}) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر پس زمینه صفحه اپلیکیشن الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر پس زمینه صفحه اپلیکیشن الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      })
    ]
  }
}