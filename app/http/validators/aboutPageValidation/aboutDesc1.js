const validator = require('../validator');
const {check} = require('express-validator/check');

module.exports = new class aboutDesc1 extends validator {
  handle() {
    return [
      check('desc')
        .not().isEmpty()
        .withMessage('متن About Description نمی تواند خالی باشد'),
    ]
  }
}