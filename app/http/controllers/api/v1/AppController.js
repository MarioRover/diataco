const Controller = require('../Controller');


module.exports = new class AppController extends Controller {
  async index(req , res , next) {

    try {
      let Apps = await this.models.Apps.find({});
      if (this.isEmpty(Apps)) return this.error('applications not found', res);
      
      res.json({
        data: Apps,
        status  : 'ok'
      });
    } catch (error) {
      return this.error(error.message , res);
    }
  }

}