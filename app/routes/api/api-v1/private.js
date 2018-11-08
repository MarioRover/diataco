const express = require('express');
const router = express.Router();

// Controller ** 
const AdminController = require('app/http/controllers/api/v1/AdminController');
// Validator**
// Router **
router.get('/admin' , AdminController.admin);

module.exports = router;