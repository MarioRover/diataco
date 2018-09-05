const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/home/homeController');
const seoController = require('app/http/controllers/home/seoController');
const weblogController = require('app/http/controllers/home/weblogController');
const contactController = require('app/http/controllers/home/contactController');
// Home Routes
router.get('/' , homeController.showPage);
// Seo Router
router.get('/seo', seoController.showPage);
// Web Log Router
router.get('/weblog', weblogController.showPage);
// About Us Router
router.get('/contact', contactController.showPage);

module.exports = router;