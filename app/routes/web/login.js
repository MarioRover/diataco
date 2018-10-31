const express = require('express');
const router = express.Router();

// Controllers
const loginAdmins = require('app/http/controllers/admin/auth/loginAdmins');
// Validation
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
// Routes
router.get('/', redirectIfAuthenticated.loginRouter, loginAdmins.index);
module.exports = router;