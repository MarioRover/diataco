const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
// Home Routes
router.get('/' , homeController.showPage);
// Login Router
router.get('/auth/login' , loginController.showPage);
// Register Router
router.get('/auth/register', registerController.showPage);

module.exports = router;