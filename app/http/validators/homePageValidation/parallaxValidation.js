const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class parallaxPagesValidation extends validator {
  handle() {
    return [
      check('headerParallax')
        .not().isEmpty()
        .withMessage('تیتر پارالاکس نمی تواند خالی باشد'),
      check('descParallax')
        .not().isEmpty()
        .withMessage('توضیحات پارالاکس نمی تواند خالی باشد'),
      
      check('aboutUsphotoVal')
        .custom(async (value , {req})=>{
          if(req.method !== 'PUT') {
            if (!value) throw new Error('وارد کردن تصویر پارالاکس الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل پارالاکس وارد شده از پسوندهای تصاویر نیست');
            }
          } else if (value) {
            if (!value) throw new Error('وارد کردن تصویر پارالاکس الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل پارالاکس وارد شده از پسوندهای تصاویر نیست');
            }
          }
        }),  

    ]
  }
}