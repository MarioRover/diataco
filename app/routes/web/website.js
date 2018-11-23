const express = require('express');
const router = express.Router();

// Controllers
const websiteController = require('app/http/controllers/home/websiteController');
// Routes
router.get('/', websiteController.showPage);
router.get('/:website', websiteController.website);


module.exports = router;