const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const loginAdmins = require('app/http/controllers/admin/auth/loginAdmins');
const messagesController = require('app/http/controllers/admin/messagesController');
const sitePagesController = require('app/http/controllers/admin/siteSittings/pages/sitePagesController');
const contactPagesController = require('app/http/controllers/admin/siteSittings/pages/contactPagesController');
// Validators
const loginAdminsValidation = require('app/http/validators/loginAdminsValidation');
const contactPagesValidation = require('app/http/validators/contactPagesValidation');
// Middleware
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');
const convertFileToField = require('app/http/middleware/convertFileToField')
// Helpers
const upload = require('app/helpers/uploadImage');

router.use((req, res, next) => {
  res.locals.layout = 'admin/master';
  next();
});
// Routes
router.get('/', redirectIfAuthenticated.adminDashboard , loginAdmins.index);
// router.post('/', loginAdminsValidation.handle() ,loginAdmins.registerProccess);
router.post('/', loginAdminsValidation.handle() , loginAdmins.loginProccess);
router.get('/logout' ,(req , res) => {
  req.logout();
  res.clearCookie('remember_token');
  res.redirect('/');
})
router.get('/dashboard', redirectIfAuthenticated.adminLogin, adminController.index);
router.get('/messages', redirectIfAuthenticated.adminLogin, messagesController.index);
router.get('/messages/:id', redirectIfAuthenticated.adminLogin, messagesController.viewMessage);
router.delete('/messages/:id', redirectIfAuthenticated.adminLogin, messagesController.destroy);
// Site Sittings
router.get('/site-setting/pages', redirectIfAuthenticated.adminLogin, sitePagesController.index);
// Contact Page
router.get('/site-setting/pages/contact', redirectIfAuthenticated.adminLogin, contactPagesController.index);
router.post('/site-setting/pages/contact',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  contactPagesValidation.handle(),
  contactPagesController.set
);
router.put('/site-setting/pages/contact',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  contactPagesValidation.handle(),
  contactPagesController.update
);

module.exports = router;