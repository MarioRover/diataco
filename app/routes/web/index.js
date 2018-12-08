const express = require('express');
const router = express.Router();
const controller = require('app/http/controllers/controller');
let {Manifest} = new controller();
// Router
const adminRouter = require('./admin');
const homeRouter = require('./home');
const applicationRouter = require('./application');
const websiteRouter = require('./website');
const loginRouter = require('./login');

const errorHandler = require('app/http/middleware/errorHandler');
// Login Router
router.use(`/${config.service.adminRoute}`, loginRouter);
// Admin Router
router.use(`/admin`, adminRouter);
// Home Router
router.use('/', homeRouter);
// Application
router.use('/applications', applicationRouter);
// Website
router.use('/websites', websiteRouter);
// Error Pages
router.get('/error' , (req , res , next) => {
  res.render('errors/stack' , {
    title : 'Error',
    layout: 'home/master',
    descTags : 'Error',
    keyTags : 'Error',
    manifest : Manifest
  })
})


// Error Handler
router.all('*', errorHandler.error404);
router.use(errorHandler.handler);

module.exports = router;