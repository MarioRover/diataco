const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
// Routes
router.get('/' ,adminController.showPage);

module.exports = router;