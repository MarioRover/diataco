const validator = require('./validator');
const {check} = require('express-validator/check');
const path = require('path');
const isEmail = require('validator/lib/isEmail');

module.exports = new class homeValidation extends validator {
  handle() {
    return [
      check('address')
        .not().isEmpty()
        .withMessage('فیلد آدرس نمی تواند خالی باشد'), 
      check('email')
        .custom(async (value , {req}) => {
          if (!value) throw new Error('فیلد ایمیل نمی تواند خالی باشد');
          if (!isEmail(value)) throw new Error('فرمت ایمیل وارد شده صحیح نمی باشد');
        }),
      check('telephone')
        .not().isEmpty()
        .withMessage('فیلد تلفن نمی تواند خالی باشد'),
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