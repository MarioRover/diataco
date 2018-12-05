const Controller = require('../controllers/controller');

class errorHandler extends Controller {
  async error404(req , res , next) {
    try {
      let error = new Error('صفحه مورد نظر یافت نشد');
      error.statusCode = 404;
      throw error;
    } catch (error) {
      next(error);
    }
  }

  async handler(error , req , res , next) {
    const statusCode = error.statusCode || 500;
    const message = error.message || '';
    const stack = error.stack || '';
    const layouts = {
      layout: 'home/master'
    }
    const debug = await config.debug;
    if(debug) {
      res.render('errors/error' , {
        ...layouts,
        message,
        stack,
        statusCode,
        title : 'Error',
        tags : ['Error'],
        manifest : this.Manifest
      })
    } else {
      res.render(`errors/${statusCode}`, {
        ...layouts,
        title: `Error ${statusCode}`,
        message,
        statusCode,
        tags : ['Error'],
        manifest : this.Manifest
      });
    }
  }
}

module.exports = new errorHandler(); 