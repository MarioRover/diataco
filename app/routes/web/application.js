const express = require('express');
const router = express.Router();

// Controllers
const applicationController = require('app/http/controllers/applicationController');
// Routes
router.get('/', applicationController.showPage);

module.exports = router;