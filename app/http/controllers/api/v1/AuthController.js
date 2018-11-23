const Controller = require('../Controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = new class AuthController extends Controller {
  async login(req , res , next) {
    try {
      if(! await this.validationData(req , res , next)) return;

      passport.authenticate('admin.login' , { session : false } , (error , user) =>{
        if (error) return this.error(error.message, res);
        if (!user) return this.error('username or password is not valid', res , 404);
        
        req.login(user , { session : false } , (error) => {
          if (error) return this.error(error.message, res);
          // Create Token
          const token = jwt.sign({ id : user._id } , config.jwt.secret_key , {
            expiresIn : 60 * 60 * 24
          });
          return res.json({
            data : {token},
            status : 'ok'
          })
        })
      })(req , res);

    } catch (error) {
      return this.error(error.message , res);
    }
  }

}