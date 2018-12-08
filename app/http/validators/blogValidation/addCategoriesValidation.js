const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('name')
        .not().isEmpty()
        .withMessage('فیلد نام دسته بندی نمی تواند خالی باشد'),
      check('slug')
        .not().isEmpty()
        .withMessage('فیلد اسلاگ نمی تواند خالی باشد'),
      check('desc')
        .not().isEmpty()
        .withMessage('فیلد خلاصه دسته بندی نمی تواند خالی باشد'),
      check('wallpaperVal')
      .custom(async (value, {
        req
      }) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر پس زمینه دسته بندی الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر پس زمینه دسته بندی الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      }),
      check('previewImageVal')
      .custom(async (value, {
        req
      }) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر پیش نمایش دسته بندی الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر پیش نمایش دسته بندی الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      }),
    ]
  }
}