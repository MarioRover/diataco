const middleware = require('./middleware');

class rememberLogin extends middleware {
  handle(req , res , next) {
    if (!req.isAuthenticated()) {
      const rememberToken = req.signedCookies.remember_token;
      if (rememberToken) return this.adminFind(rememberToken, req, next);
    }
    next();
  }

  adminFind(rememberToken , req , next) {
    this.models.Admin.findOne({ rememberToken } , (error , admin) => {
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