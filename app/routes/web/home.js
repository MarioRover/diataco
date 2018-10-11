const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/home/homeController');
const seoController = require('app/http/controllers/home/seoController');
const blogController = require('app/http/controllers/home/blogController');
const contactController = require('app/http/controllers/home/contactController');
const aboutController = require('app/http/controllers/home/aboutController');
// Validations
const contactValidation = require('app/http/validators/contactValidation');
// Home Routes
router.get('/' , homeController.showPage);
// Seo Router
router.get('/seo', seoController.index);
// Blog Router
router.get('/blog', blogController.index);
router.get('/blog/:category', blogController.showBlogs);
router.get('/blog/:category/:blog', blogController.showBlog);
// Contact Us Router
router.get('/contact', contactController.index);
router.post('/contact', contactValidation.handle() ,contactController.getMessage);
// About Us Router
router.get('/about', aboutController.showPage);




module.exports = router;