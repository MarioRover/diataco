const database = require('./database');
const layout = require('./layout');
const session = require('./session');
const service = require('./service');
const controller = require('../app/http/controllers/controller');
let newCon = new controller();

module.exports = {
  port : process.env.PORT,
  database,
  layout,
  session,
  service,
  debug: newCon.debug(),
  siteurl: process.env.WEBSITE_URL,
  jwt : {
    secret_key : 'GGK$%#125)0(KJUA%&#250ASX'
  }
}