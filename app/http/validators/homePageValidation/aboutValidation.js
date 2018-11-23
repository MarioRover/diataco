const validator = require('../validator');
const {
  check
} = require('express-validator/check');
const path = require('path');
const isEmail = require('validator/lib/isEmail');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('aboutUsheader')
      .not().isEmpty()
      .withMessage('فیلد تیتر درباره ما نمی تواند خالی باشد'),
      check('aboutUsheaderDesc')
      .not().isEmpty()
      .withMessage('فیلد توضیحات تیتر درباره ما نمی تواند خالی باشد'),
      check('aboutUsphotoVal')
      .custom(async (value, {
        req
      }) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر درباره ما الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر درباره ما الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      }),
    ]
  }
}