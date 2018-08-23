const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('app/http/controllers/homeController');
// Home Routes
router.get('/' , homeController.showPage);
// Route Test
router.get('/hello', (req, res) => {
  res.json('Hello World , This Reout For Test Node Js Project');
});

module.exports = router;