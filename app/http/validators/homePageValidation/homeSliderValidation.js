const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class homeSliderValidation extends validator {
  handle() {
    return [
      check('homeSlideritem1')
        .not().isEmpty()
        .withMessage('فیلد متن اول نمی تواند خالی باشد'), 
      check('homeSlidericonItem1')
        .not().isEmpty()
        .withMessage('فیلد آیکون متن اول نمی تواند خالی باشد'),
      check('homeSlideritem2')
        .not().isEmpty()
        .withMessage('فیلد متن دوم نمی تواند خالی باشد'), 
      check('homeSlidericonItem2')
        .not().isEmpty()
        .withMessage('فیلد آیکون متن دوم نمی تواند خالی باشد'),
      check('homeSlideritem3')
        .not().isEmpty()
        .withMessage('فیلد متن سوم نمی تواند خالی باشد'), 
      check('homeSlidericonItem3')
        .not().isEmpty()
        .withMessage('فیلد آیکون متن سوم نمی تواند خالی باشد'),
      check('photoVal')
        .custom(async (value , {req})=>{
          if(req.method !== 'PUT') {
            if (!value) throw new Error('وارد کردن تصویر صفحه نخست الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
            }
          } else if(value) {
            if (!value) throw new Error('وارد کردن تصویر صفحه نخست الزامی است');
            let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
            if (!fileExt.includes(path.extname(value))) {
              throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
            }
          }
        }),

    ]
  }
}