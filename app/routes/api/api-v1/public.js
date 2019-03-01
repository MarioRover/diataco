const express = require('express');
const router = express.Router();

// controllers
const recaptchaController = require('app/http/controllers/api/recaptchaController')

router.get('/recaptcha' , recaptchaController.get);
router.post('/recaptcha' , recaptchaController.post);

module.exports = router;