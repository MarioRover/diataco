const validator = require('../validator');
const {check} = require('express-validator/check');
const path = require('path');

module.exports = new class updateCategoriesValidation extends validator {
  handle() {
    return [
      check('name')
      .not().isEmpty()
      .withMessage('فیلد نام دسته بندی نمی تواند خالی باشد'),
      check('slug')
      .not().isEmpty()
      .withMessage('فیلد اسلاگ نمی تواند خالی باشد'),
      check('photoVal')
      .custom(async (value, {req}) => {
        if(value) {
          let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
          if (!fileExt.includes(path.extname(value))) {
            throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
          }
        }
      }),
    ]
  }
}