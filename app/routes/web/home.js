const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
// Home Routes
router.get('/' , homeController.showPage);
// Page not Found
router.get('/404' , homeController.page404);

module.exports = router;