const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const loginAdmins = require('app/http/controllers/admin/auth/loginAdmins');
const messagesController = require('app/http/controllers/admin/messagesController');
const sitePagesController = require('app/http/controllers/admin/siteSittings/pages/sitePagesController');
const contactPagesController = require('app/http/controllers/admin/siteSittings/pages/contactPagesController');
const homePagesController = require('app/http/controllers/admin/siteSittings/pages/homePagesController');
const aboutPagesController = require('app/http/controllers/admin/siteSittings/pages/aboutPagesController');
const blogController = require('app/http/controllers/admin/blog/blogController');
const usersController = require('app/http/controllers/admin/usersController');
const seoPagesController = require('app/http/controllers/admin/siteSittings/pages/seoPagesController');
const websiteController = require('app/http/controllers/admin/websiteController');
const applicationController = require('app/http/controllers/admin/applicationController');
const siteInfoController = require('app/http/controllers/admin/siteSittings/siteInfoController');
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
const aboutHeader = require('app/http/validators/aboutPageValidation/aboutHeader');
const aboutDesc1 = require('app/http/validators/aboutPageValidation/aboutDesc1');
const aboutDesc2 = require('app/http/validators/aboutPageValidation/aboutDesc2');
const aboutArticles = require('app/http/validators/aboutPageValidation/aboutArticles');
const aboutParallax = require('app/http/validators/aboutPageValidation/aboutParallax');
const websitesValidation = require('app/http/validators/websitesValidation');
const applicationValidation = require('app/http/validators/applicationValidation');
const siteInfoValidation = require('app/http/validators/siteInfoValidation');
const seoHeaderValidation = require('app/http/validators/seoPageValidation/seoHeader');
const seoDesc1Validation = require('app/http/validators/seoPageValidation/seoDesc1');
const seoDesc2Validation = require('app/http/validators/seoPageValidation/seoDesc2');
const seoParallaxValidation = require('app/http/validators/seoPageValidation/seoParallax');
const usersValidation = require('app/http/validators/usersValidation');
const usersBackgroundValidation = require('app/http/validators/usersBackgroundValidation');
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
router.get('/', redirectIfAuthenticated.adminDashboard, adminController.index);
// router.post('/', loginAdminsValidation.handle() ,loginAdmins.registerProccess);
router.post('/login', loginAdminsValidation.handle() , loginAdmins.loginProccess);
router.get('/logout' ,(req , res) => {
  req.logout();
  res.clearCookie('remember_token');
  res.redirect('/');
});
router.post('/upload-image',
redirectIfAuthenticated.adminLogin,
upload.single('upload'),
adminController.uploadImage
);
router.get('/profile/edit', redirectIfAuthenticated.adminLogin, adminController.showProfileEdit);
router.put('/profile/edit', 
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  usersBackgroundValidation.handle(),
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
// About Page
router.get('/site-setting/pages/about', redirectIfAuthenticated.adminLogin, aboutPagesController.index);
router.put('/site-setting/pages/about/header',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  aboutHeader.handle(),
  aboutPagesController.header
  );
router.put('/site-setting/pages/about/description1', 
  upload.single('photo'),
  convertFileToField.handle,
  aboutDesc1.handle(),
  redirectIfAuthenticated.adminLogin, 
  aboutPagesController.description1
);
router.put('/site-setting/pages/about/description2',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  aboutDesc2.handle(),
  aboutPagesController.description2
);
router.put('/site-setting/pages/about/articles',
  redirectIfAuthenticated.adminLogin,
  aboutArticles.handle(),
  aboutPagesController.articles
  );
router.put('/site-setting/pages/about/parallax',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  aboutParallax.handle(),
  aboutPagesController.parallax
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
// /////////// Seo Page
router.get('/site-setting/pages/seo', redirectIfAuthenticated.adminLogin, seoPagesController.index);
router.put('/site-setting/pages/seo/header', 
  redirectIfAuthenticated.adminLogin, 
  upload.single('photo'),
  convertFileToField.handle,
  seoHeaderValidation.handle(),
  seoPagesController.header
);
router.put('/site-setting/pages/seo/description1',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  seoDesc1Validation.handle(),
  seoPagesController.description1
);
router.put('/site-setting/pages/seo/description2',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  seoDesc2Validation.handle(),
  seoPagesController.description2
);
router.put('/site-setting/pages/seo/articles',
  redirectIfAuthenticated.adminLogin,
  aboutArticles.handle(),
  seoPagesController.articles
);
router.put('/site-setting/pages/seo/parallax',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  seoParallaxValidation.handle(),
  seoPagesController.parallax
);

/////// Category Blog
router.get('/blogs/categories', redirectIfAuthenticated.adminLogin, blogController.index);
router.get('/blogs/categories/add', redirectIfAuthenticated.adminLogin, blogController.viewCreateCategory);
router.delete('/blogs/categories', redirectIfAuthenticated.adminLogin, blogController.removeCategory);
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
////////////// Users ////////////////////
router.get('/users', redirectIfAuthenticated.adminLogin, usersController.index);
router.get('/users/add', redirectIfAuthenticated.adminLogin, usersController.showAddUser);
router.post('/users/add', 
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  usersValidation.handle(),
  usersController.createUser
);
router.put('/users/:user/background',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  usersBackgroundValidation.handle(),
  usersController.setBackground
);
router.get('/users/:user', redirectIfAuthenticated.adminLogin, usersController.showUpdateUser);
router.put('/users/:user/update',
  redirectIfAuthenticated.adminLogin,
  upload.single('photo'),
  convertFileToField.handle,
  usersValidation.handle(),
  usersController.updateUser
);
router.delete('/users/delete', redirectIfAuthenticated.adminLogin, usersController.removeUser);
module.exports = router;
///////////////// WebSites //////////////////////////
router.get('/websites', redirectIfAuthenticated.adminLogin, websiteController.index);
router.delete('/websites', redirectIfAuthenticated.adminLogin, websiteController.removeWebsite);
router.get('/websites/add', redirectIfAuthenticated.adminLogin, websiteController.indexAdd);
router.post('/websites/add',
  redirectIfAuthenticated.adminLogin,
  upload.fields([
    {name : 'logo' , maxCount : 1},
    {name : 'previewImage' , maxCount : 1},
    {name : 'images' , maxCount : 6},
  ]),
  convertFileToField.handle,
  websitesValidation.handle(),
  websiteController.addWebsite
);
router.get('/websites/:website', redirectIfAuthenticated.adminLogin, websiteController.website);
router.put('/websites/:website',
  redirectIfAuthenticated.adminLogin,
  upload.fields([
    {name : 'logo' , maxCount : 1},
    {name : 'previewImage' , maxCount : 1},
    {name : 'images' , maxCount : 6},
  ]),
  convertFileToField.handle,
  websitesValidation.handle(),
  websiteController.updateWebsite
);
router.delete('/gallery', redirectIfAuthenticated.adminLogin, adminController.gallery);
/////////////// Applications ////////////////////
router.get('/applications', redirectIfAuthenticated.adminLogin, applicationController.index);
router.delete('/applications', redirectIfAuthenticated.adminLogin, applicationController.removeApplication);
router.get('/applications/add', redirectIfAuthenticated.adminLogin, applicationController.indexAdd);
router.post('/applications/add',
  redirectIfAuthenticated.adminLogin,
  upload.fields([
    {name : 'logo' , maxCount : 1},
    {name : 'previewImage' , maxCount : 1},
    {name : 'images' , maxCount : 6},
  ]),
  convertFileToField.handle,
  applicationValidation.handle(),
  applicationController.addApplication
);
router.get('/applications/:application', redirectIfAuthenticated.adminLogin, applicationController.application);
router.put('/applications/:application',
  redirectIfAuthenticated.adminLogin,
  upload.fields([
    {name : 'logo' , maxCount : 1},
    {name : 'previewImage' , maxCount : 1},
    {name : 'images' , maxCount : 6},
  ]),
  convertFileToField.handle,
  applicationValidation.handle(),
  applicationController.updateApplication
);
// //////////SiteInfo/////////////
router.get('/site-info', redirectIfAuthenticated.adminLogin, siteInfoController.index);
router.post('/site-info',
  redirectIfAuthenticated.adminLogin,
  upload.single('logo'),
  convertFileToField.handle,
  siteInfoValidation.handle(),
  siteInfoController.insertInfo
);
router.put('/site-info',
  redirectIfAuthenticated.adminLogin,
  upload.single('logo'),
  convertFileToField.handle,
  siteInfoValidation.handle(),
  siteInfoController.insertInfo
);