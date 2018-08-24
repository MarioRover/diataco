const express = require('express');
const router = express.Router();

// Controllers
const websiteController = require('app/http/controllers/websiteController');
// Routes
router.get('/', websiteController.showPage);

module.exports = router;