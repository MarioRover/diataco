const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/home/homeController');
const seoController = require('app/http/controllers/home/seoController');
const weblogController = require('app/http/controllers/home/weblogController');
const contactController = require('app/http/controllers/home/contactController');
const aboutController = require('app/http/controllers/home/aboutController');
// Validations
const contactValidation = require('app/http/validators/contactValidation');
// Home Routes
router.get('/' , homeController.showPage);
// Seo Router
router.get('/seo', seoController.showPage);
// Web Log Router
router.get('/weblog', weblogController.showPage);
// Contact Us Router
router.get('/contact', contactController.index);
router.post('/contact', contactValidation.handle() ,contactController.getMessage);
// About Us Router
router.get('/about', aboutController.showPage);

module.exports = router;