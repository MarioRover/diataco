const middleware = require('./middleware');

class redirectIfAuthenticated extends middleware {
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
      next();
    }
  }
}

module.exports = new redirectIfAuthenticated();