const validator = require('../validator');
const {check} = require('express-validator/check');

module.exports = new class seoDesc extends validator {
  handle() {
    return [
      check('desc')
        .not().isEmpty()
        .withMessage('متن SEO Description نمی تواند خالی باشد'),
    ]
  }
}