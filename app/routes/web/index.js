const express = require('express');
const router = express.Router();

// Router
const adminRouter = require('./admin');
const homeRouter = require('./home');
const applicationRouter = require('./application');
const websiteRouter = require('./website');
// Middleware
const setHomeMaster = require('app/http/middleware/setHomeMaster');
// Admin Router
router.use('/admin', adminRouter);
// Home Router
router.use('/', homeRouter);
// Application
router.use('/application', applicationRouter);
// Website
router.use('/website', websiteRouter);
// Page not Found
router.use('*' , setHomeMaster.handle , (req , res) => {
  res.status(404).render('pageNotFound' , {
    title : 'صفحه مورد نظر یافت نشد'
  });
});

module.exports = router;