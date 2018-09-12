const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Admins = require('app/models/admin');

// Config Passport
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  Admins.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('admin.register' , new localStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
} , (req , email , password , done) => {
  Admins.findOne({ 'email' : email } , (error , admin) => {
    if(error) return done(error);
    if(admin) return done(null , false , req.flash('errors' , 'چنین کاربری قبلا ثبت نام کرده است'));
    const newAdmin = new Admins({
      email,
      password
    });
    newAdmin.save(error => {
      if(error) return done(error , false , req.flash('errors' , 'ثبت نام انجام نشد'));
      done(null,newAdmin);
    })
  });
}))


passport.use('admin.login' , new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
} , (req , email , password , done) => {
  Admins.findOne({ 'email' : email } , (error , admin) => {
    if(error) return done(error);
    if (! admin || ! admin.comparePassword(password)) {
      return done(null , false , req.flash('errors' , 'اطلاعات وارد شده صحیح نمی باشد'))
    }
    done(null , admin);
  });
}))
