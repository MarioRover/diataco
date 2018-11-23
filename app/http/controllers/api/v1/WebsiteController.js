const Controller = require('../Controller');


module.exports = new class WebsiteController extends Controller {
  async index(req , res , next) {

    try {
      let Websites = await this.models.Websites.find({});
      if (this.isEmpty(Websites)) return this.error('websites not found', res);
      
      res.json({
        data: Websites,
        status  : 'ok'
      });
    } catch (error) {
      return this.error(error.message , res);
    }
  }

}