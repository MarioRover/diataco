const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const loginAdmins = require('app/http/controllers/admin/auth/loginAdmins');
const messagesController = require('app/http/controllers/admin/messagesController');
const sitePagesController = require('app/http/controllers/admin/siteSittings/pages/sitePagesController');
const contactPagesController = require('app/http/controllers/admin/siteSittings/pages/contactPagesController');
const homePagesController = require('app/http/controllers/admin/siteSittings/pages/homePagesController');
// Validators
const loginAdminsValidation = require('app/http/validators/loginAdminsValidation');
const contactPagesValidation = require('app/http/validators/contactPagesValidation');
const homePagesAboutValidation = require('app/http/validators/homePageValidation/aboutValidation');
const homePagesParallaxValidation = require('app/http/validators/homePageValidation/parallaxValidation');
const homePagesHomeSliderValidation = require('app/http/validators/homePageValidation/homeSliderValidation');
const homePagesAbilityValidation = require('app/http/validators/homePageValidation/abilityValidation');
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
});
router.get('/profile/edit', redirectIfAuthenticated.adminLogin, adminController.showProfileEdit);
router.put('/profile/edit', 
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  adminController.profileEdit
);
router.get('/dashboard', redirectIfAuthenticated.adminLogin, adminController.index);
router.get('/messages', redirectIfAuthenticated.adminLogin, messagesController.index);
router.get('/messages/:id', redirectIfAuthenticated.adminLogin, messagesController.viewMessage);
router.delete('/messages', redirectIfAuthenticated.adminLogin, messagesController.destroy);
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
// Home Page
router.get('/site-setting/pages/home', redirectIfAuthenticated.adminLogin, homePagesController.index);
router.put('/site-setting/pages/home/about',
  redirectIfAuthenticated.adminLogin,
  upload.single('aboutUsphoto'),
  convertFileToField.handle,
  homePagesAboutValidation.handle(),
  homePagesController.updateAbout
);
router.put('/site-setting/pages/home/parallax',
  redirectIfAuthenticated.adminLogin,
  upload.single('parallaxphoto'),
  convertFileToField.handle,
  homePagesParallaxValidation.handle(),
  homePagesController.updateParallax
);
router.put('/site-setting/pages/home/homeslider',
  redirectIfAuthenticated.adminLogin,
  upload.single('homeSliderphoto'),
  convertFileToField.handle,
  homePagesHomeSliderValidation.handle(),
  homePagesController.updateHomeSlider
);
router.put('/site-setting/pages/home/ability',
  redirectIfAuthenticated.adminLogin,
  homePagesAbilityValidation.handle(),
  homePagesController.updateAbility
);
module.exports = router;