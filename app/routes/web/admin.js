const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const loginAdmins = require('app/http/controllers/admin/auth/loginAdmins');
const messagesController = require('app/http/controllers/admin/messagesController');
// Validators
const loginAdminsValidation = require('app/http/validators/loginAdminsValidation');
// Middleware
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');

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

module.exports = router;