const validator = require('./validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class contactValidation extends validator {
  handle() {
    return [
      check('address')
        .not().isEmpty()
        .withMessage('فیلد آدرس نمی تواند خالی باشد'), 
      check('iconAddress')
        .not().isEmpty()
        .withMessage('فیلد آیکون آدرس نمی تواند خالی باشد'),
      check('email')
        .not().isEmpty()
        .withMessage('فیلد ایمیل نمی تواند خالی باشد'),
      check('email')
        .isEmail()
        .withMessage('فرمت ایمیل وارد شده صحیح نمی باشد'),
      check('iconEmail')
        .not().isEmpty()
        .withMessage('فیلد آیکون ایمیل نمی تواند خالی باشد'),
      check('telephone')
        .not().isEmpty()
        .withMessage('فیلد تلفن نمی تواند خالی باشد'),
      check('iconTelephone')
        .not().isEmpty()
        .withMessage('فیلد آیکون تلفن نمی تواند خالی باشد'),
      check('photoVal')
        .custom(async (value , {req})=>{
          if(req.method !== 'PUT') {
            if (!value) throw new Error('وارد کردن تصویر الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
            }
          } else if(value) {
            if (!value) throw new Error('وارد کردن تصویر الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
            }
          }
          
        }),   
    ]
  }
}