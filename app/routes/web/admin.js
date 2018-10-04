const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const loginAdmins = require('app/http/controllers/admin/auth/loginAdmins');
const messagesController = require('app/http/controllers/admin/messagesController');
const sitePagesController = require('app/http/controllers/admin/siteSittings/pages/sitePagesController');
const contactPagesController = require('app/http/controllers/admin/siteSittings/pages/contactPagesController');
const homePagesController = require('app/http/controllers/admin/siteSittings/pages/homePagesController');
const blogController = require('app/http/controllers/admin/blog/blogController');
// Validators
const loginAdminsValidation = require('app/http/validators/loginAdminsValidation');
const contactPagesValidation = require('app/http/validators/contactPagesValidation');
const homePagesAboutValidation = require('app/http/validators/homePageValidation/aboutValidation');
const homePagesParallaxValidation = require('app/http/validators/homePageValidation/parallaxValidation');
const homePagesHomeSliderValidation = require('app/http/validators/homePageValidation/homeSliderValidation');
const homePagesAbilityValidation = require('app/http/validators/homePageValidation/abilityValidation');
const addCategoriesValidation = require('app/http/validators/blogValidation/addCategoriesValidation');
const updateCategoriesValidation = require('app/http/validators/blogValidation/updateCategoriesValidation');
const createBlogValidation = require('app/http/validators/blogValidation/createBlogValidation');
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
router.post('/upload-image',
  redirectIfAuthenticated.adminLogin,
  upload.single('upload'),
  adminController.uploadImage
);
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
// Blog
router.get('/blogs/categories', redirectIfAuthenticated.adminLogin, blogController.index);
router.get('/blogs/categories/add', redirectIfAuthenticated.adminLogin, blogController.viewCreateCategory);
router.post('/blogs/categories/add',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  addCategoriesValidation.handle(),
  blogController.createCategory
);
router.get('/blogs/categories/:category', redirectIfAuthenticated.adminLogin, blogController.viewCategory);
router.put('/blogs/categories/:slug/update', 
  redirectIfAuthenticated.adminLogin, 
  upload.single('photo'),
  convertFileToField.handle,
  updateCategoriesValidation.handle(),
  blogController.updateCategory,
);
//////////////// Blog ///////////////////////
router.get('/blogs/categories/:category/blog/add', redirectIfAuthenticated.adminLogin, blogController.viewCreateBlog);
router.post('/blogs/categories/:category/blog/add', 
redirectIfAuthenticated.adminLogin, 
  upload.single('photo'),
  convertFileToField.handle,
  createBlogValidation.handle(),
  blogController.createBlog
);
router.delete('/blogs/categories/:category/blog/delete', redirectIfAuthenticated.adminLogin, blogController.deleteBlog);
router.get('/blogs/categories/:category/:blog', redirectIfAuthenticated.adminLogin, blogController.viewBlog);
router.put('/blogs/categories/:category/:blog', 
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  createBlogValidation.handle(),
  blogController.updateBlog
);



module.exports = router;