const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class abilityValidation extends validator {
  handle() {
    return [
  
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
        
    ]
  }
}