const database = require('./database');
const layout = require('./layout');
const session = require('./session');

module.exports = {
  port : process.env.PORT,
  database,
  layout,
  session,
  debug: false
}