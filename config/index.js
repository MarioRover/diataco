const database = require('./database');
const layout = require('./layout');
const session = require('./session');
const service = require('./service');

module.exports = {
  port : process.env.PORT,
  database,
  layout,
  session,
  service,
  debug: true
}