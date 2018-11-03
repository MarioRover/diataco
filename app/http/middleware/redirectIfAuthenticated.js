const middleware = require('./middleware');
const Admins = require('app/models/admin');

module.exports = new class redirectIfAuthenticated extends middleware {
  adminLogin(req , res , next) {
    if (!req.isAuthenticated()) {
      res.redirect('/admin');
    } else {
      next();
    }
  }

  adminDashboard(req , res , next) {
    if(req.isAuthenticated()) {
      res.redirect('/admin/dashboard');
    } else {
      let error = new Error('صفحه مورد نظر یافت نشد');
      error.statusCode = 404;
      throw error;
    }
  }
  
  loginRouter(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/admin/dashboard');
    } else {
      next();
    }
  }
}