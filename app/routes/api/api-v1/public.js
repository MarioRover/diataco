const express = require('express');
const router = express.Router();

// Controller ** 
const WebsiteController = require('app/http/controllers/api/v1/WebsiteController');
const AppController = require('app/http/controllers/api/v1/AppController');
const AuthController = require('app/http/controllers/api/v1/AuthController');
// Validator**
const loginAdminsValidation = require('app/http/validators/loginAdminsValidation');
// Router **
router.get('/websites' , WebsiteController.index);
router.get('/applications', AppController.index);
router.post('/login', loginAdminsValidation.handle(), AuthController.login);

module.exports = router;