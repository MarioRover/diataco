const middleware = require('./middleware');
const Admins = require('app/models/admin');
const passport = require('passport');

module.exports = new class authenticateApi extends middleware {
  handle(req , res , next) {
    passport.authenticate('jwt' , { session : false } , (error , admin , info ) => {
      if(error || !admin) {
        return res.status(403).json({
          data : info.message || 'you dont have permission',
          status : 'error'
        })
      }
      req.admin = admin;
      next();
    })(req , res , next);
  }
}