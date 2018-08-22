const express = require('express');
const router = express.Router();

// Admin Router
const adminRouter = require('./admin');
router.use('/admin', adminRouter);
// Home Router
const homeRouter = require('./home');
router.use('/', homeRouter);
// Page not Found
router.use((req , res) => {
  res.status(404).render('pageNotFound');
});
module.exports = router;