const validator = require('./validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('name')
        .not().isEmpty()
        .withMessage('فیلد نام وب سایت نمی تواند خالی باشد'),
      check('link')
        .not().isEmpty()
        .withMessage('فیلد لینک وب سایت نمی تواند خالی باشد'),
      check('slug')
        .not().isEmpty()
        .withMessage('فیلد اسلاگ وب سایت نمی تواند خالی باشد'),
      check('desc')
        .not().isEmpty()
        .withMessage('فیلد توضیحات وب سایت نمی تواند خالی باشد'),


      check('logoVal')
      .custom(async (value, {
        req
      }) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر لوگوی وب سایت الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر لوگوی وب سایت الزامی است');
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
          if (!value) throw new Error('وارد کردن تصویر پیش نمایش وب سایت الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر پیش نمایش وب سایت الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      }),

      check('wallpaperVal')
      .custom(async (value, {
        req
      }) => {
        if (req.method !== 'PUT') {
          if (!value) throw new Error('وارد کردن تصویر پس زمینه وب سایت الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        } else if (value) {
          if (!value) throw new Error('وارد کردن تصویر پس زمینه وب سایت الزامی است');
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      }),

      check('imagesVal')
        .custom(async (value, {req}) => {
          if (value == 0) throw new Error('وارد کردن حداقل یک عکس الزامی می باشد');
        }),
    ]
  }
}