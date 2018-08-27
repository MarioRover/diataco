const middleware = require('./middleware');

class setHomeMaster extends middleware {
  handle(req , res , next) {
    res.locals.layout = 'home/master';
    next();
  }
}

module.exports = new setHomeMaster();