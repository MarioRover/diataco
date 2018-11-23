const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class createBlogValidation extends validator {
  handle() {
    return [
      check('title')
      .not().isEmpty()
      .withMessage('تیتر بلاگ نمی تواند خالی باشد'),
      check('slug')
      .not().isEmpty()
      .withMessage('فیلد اسلاگ نمی تواند خالی باشد'),
      check('tags')
        .not().isEmpty()
        .withMessage('فیلد تگ های بلاگ نمی تواند خالی باشد'),
      check('summery')
        .not().isEmpty()
        .withMessage('خلاصه بلاگ نمی تواند خالی باشد'),
      check('description')
        .not().isEmpty()
        .withMessage('متن بلاگ نمی تواند خالی باشد'),
      check('photoVal')
        .custom(async (value, {req}) => {
          if (req.method !== 'PUT') {
            if (!value) throw new Error('وارد کردن تصویر پس زمینه بلاگ الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
            }
          } else if (value) {
            if (!value) throw new Error('وارد کردن تصویر پس زمینه بلاگ الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
            }
          }
        }),
      
    ]
  }
}