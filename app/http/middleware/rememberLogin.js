const middleware = require('./middleware');
const Admin = require('app/models/admins');

class rememberLogin extends middleware {
  handle(req , res , next) {
    if (!req.isAuthenticated()) {
      const rememberToken = req.signedCookies.remember_token;
      if (rememberToken) return this.adminFind(rememberToken, req, next);
    }
    next();
  }

  adminFind(rememberToken , req , next) {
    Admin.findOne({ rememberToken } , (error , admin) => {
      if(admin) {
        req.login(admin , (error) => {
          if(error) next(error);
          next();
        })
      } else {
        next();
      }
    })
  }
}

module.exports = new rememberLogin();