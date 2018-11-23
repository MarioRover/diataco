const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');
const isEmail = require('validator/lib/isEmail');

module.exports = new class contactValidation extends validator {
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
      check('homeSliderphotoVal')
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


      
      check('aboutUsheader')
        .not().isEmpty()
        .withMessage('فیلد تیتر درباره ما نمی تواند خالی باشد'),
      check('aboutUsheaderDesc')
        .not().isEmpty()
        .withMessage('فیلد توضیحات تیتر درباره ما نمی تواند خالی باشد'),
      check('aboutUsphotoVal')
        .custom(async (value , {req})=>{
          if(req.method !== 'PUT') {
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
        
      check('abilityitem1')
        .not().isEmpty()
        .withMessage('فیلد متن اول نمی تواند خالی باشد'),
      check('abilityIconitem1')
        .not().isEmpty()
        .withMessage('آیکون متن اول نمی تواند خالی باشد'),
      check('abilityDescitem1')
        .not().isEmpty()
        .withMessage('توضیحات متن اول نمی تواند خالی باشد'),

      check('abilityitem2')
        .not().isEmpty()
        .withMessage('فیلد متن دوم نمی تواند خالی باشد'),
      check('abilityIconitem2')
        .not().isEmpty()
        .withMessage('آیکون متن دوم نمی تواند خالی باشد'),
      check('abilityDescitem2')
        .not().isEmpty()
        .withMessage('توضیحات متن دوم نمی تواند خالی باشد'),
        
      check('abilityitem3')
        .not().isEmpty()
        .withMessage('فیلد متن سوم نمی تواند خالی باشد'),
      check('abilityIconitem3')
        .not().isEmpty()
        .withMessage('آیکون متن سوم نمی تواند خالی باشد'),
      check('abilityDescitem3')
        .not().isEmpty()
        .withMessage('توضیحات متن سوم نمی تواند خالی باشد'),  

      check('abilityitem4')
        .not().isEmpty()
        .withMessage('فیلد متن چهارم نمی تواند خالی باشد'),
      check('abilityIconitem4')
        .not().isEmpty()
        .withMessage('آیکون متن چهارم نمی تواند خالی باشد'),
      check('abilityDescitem4')
        .not().isEmpty()
        .withMessage('توضیحات متن چهارم نمی تواند خالی باشد'),
        
      check('abilityitem5')
        .not().isEmpty()
        .withMessage('فیلد متن پنجم نمی تواند خالی باشد'),
      check('abilityIconitem5')
        .not().isEmpty()
        .withMessage('آیکون متن پنجم نمی تواند خالی باشد'),
      check('abilityDescitem5')
        .not().isEmpty()
        .withMessage('توضیحات متن پنجم نمی تواند خالی باشد'),
        
      check('abilityitem6')
        .not().isEmpty()
        .withMessage('فیلد متن ششم نمی تواند خالی باشد'),
      check('abilityIconitem6')
        .not().isEmpty()
        .withMessage('آیکون متن ششم نمی تواند خالی باشد'),
      check('abilityDescitem6')
        .not().isEmpty()
        .withMessage('توضیحات متن ششم نمی تواند خالی باشد'),
        
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