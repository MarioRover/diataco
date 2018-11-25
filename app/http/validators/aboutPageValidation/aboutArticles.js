const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class aboutDesc1 extends validator {
  handle() {
    return [
      check('item1')
        .not().isEmpty()
        .withMessage('فیلد متن اول نمی تواند خالی باشد'),
        check('Descitem1')
        .not().isEmpty()
        .withMessage('توضیحات متن اول نمی تواند خالی باشد'),
        check('item2')
        .not().isEmpty()
        .withMessage('فیلد متن دوم نمی تواند خالی باشد'),
        check('Descitem2')
        .not().isEmpty()
        .withMessage('توضیحات متن دوم نمی تواند خالی باشد'),
        check('item3')
        .not().isEmpty()
        .withMessage('فیلد متن سوم نمی تواند خالی باشد'),
        check('Descitem3')
        .not().isEmpty()
        .withMessage('توضیحات متن سوم نمی تواند خالی باشد'),
        check('item4')
        .not().isEmpty()
        .withMessage('فیلد متن چهارم نمی تواند خالی باشد'),
        check('Descitem4')
        .not().isEmpty()
        .withMessage('توضیحات متن چهارم نمی تواند خالی باشد'),
        check('item5')
        .not().isEmpty()
        .withMessage('فیلد متن پنجم نمی تواند خالی باشد'),
        check('Descitem5')
        .not().isEmpty()
        .withMessage('توضیحات متن پنجم نمی تواند خالی باشد'),
        check('item6')
        .not().isEmpty()
        .withMessage('فیلد متن ششم نمی تواند خالی باشد'),
        check('Descitem6')
        .not().isEmpty()
        .withMessage('توضیحات متن ششم نمی تواند خالی باشد'),
    ]
  }
}