const express = require('express');
const router = express.Router();

// Controllers
const applicationController = require('app/http/controllers/home/applicationController');
// Routes
router.get('/', applicationController.showPage);
router.get('/:application', applicationController.application);

module.exports = router;