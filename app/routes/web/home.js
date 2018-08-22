const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
// Home Routes
router.get('/' , homeController.showPage);
// Page not Found
router.get('*' ,(req , res) => {
  res.status(404).render('pageNotFound');
});

module.exports = router;