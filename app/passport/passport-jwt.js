const passport = require('passport');
const passportJWT = require('passport-jwt');
const Admins = require('app/models/admin');

const ExtractJwt  = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

passport.use('jwt' , new JwtStrategy({
  jwtFromRequest : ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('api_token')
  ]),
  secretOrKey : config.jwt.secret_key
} , async (jwtPayload , done) => {
  try {
    let Admin = await Admins.findById(jwtPayload.id);
    if(!Admin) done(null , false , { message : 'you dont have permission' });
    done(null , Admin);

  } catch (error) {
    done(null , false , { message : error.message });
  }
}))


