// Module
const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helper');
// Path

// Application
module.exports = class Aplication {
  constructor() {
    this.setupExpress();
    this.setMongoConnection();
    this.setConfig();
    this.setRouters();
  }
  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port , () => {console.log(`Listening on Port 3000`)});
  }
  setMongoConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database.url, {
      useNewUrlParser: true
    });
  }
  setConfig() {
    // Passport
    require('app/passport/passport-admin');
    //
    app.use(express.static(config.layout.public_dir));
    // Layout & Views Config
    app.set('view engine', config.layout.view_engine);
    app.set('views', config.layout.view_dir);
    app.use(config.layout.ejs.expressLayouts);
    app.set("layout extractScripts", config.layout.ejs.extractScripts);
    app.set("layout extractStyles", config.layout.ejs.extractStyles);
    app.set('layout', config.layout.ejs.master);
    // Body Parser Config
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(validator());
    app.use(session({ ...config.session}));
    app.use(cookieParser(process.env.COOKIE_SECRETKEY));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(rememberLogin.handle);
    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }
  setRouters() {
    app.use(require('app/routes/api'));
    app.use(require('app/routes/web'));
  }
}