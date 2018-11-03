const middleware = require('./middleware');
const Admins = require('app/models/admin');

class rememberLogin extends middleware {
  handle(req , res , next) {
    if (!req.isAuthenticated()) {
      const rememberToken = req.signedCookies.remember_diata_web;
      if (rememberToken) return this.adminFind(rememberToken, req, next);
    }
    next();
  }

  async adminFind(rememberToken , req , next) {
    await Admins.findOne({ rememberToken } , (error , admin) => {
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