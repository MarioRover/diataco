const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
const seoController = require('app/http/controllers/seoController');
const weblogController = require('app/http/controllers/weblogController');
const aboutUsController = require('app/http/controllers/aboutUsController');
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
// Home Routes
router.get('/' , homeController.showPage);
// Login Router
router.get('/auth/login' , loginController.showPage);
// Register Router
router.get('/auth/register', registerController.showPage);

// Seo Router
router.get('/seo', seoController.showPage);
// Web Log Router
router.get('/weblog', weblogController.showPage);
// About Us Router
router.get('/about-us', aboutUsController.showPage);

module.exports = router;