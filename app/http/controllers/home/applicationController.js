const controller = require('../controller');

module.exports = new class applicationController extends controller {
  async showPage(req, res, next) {
    try {
      let applications = await this.models.applications.find({}).limit(8).sort({createdAt :-1}).exec();
      if(this.isEmptyArray(applications)) {
        applications = 'undefined';
      }
      res.render('home/application/index', {
        title: 'وب سایت',
        applications
      });
    } catch (error) {
      return this.error('Error in showPage method in applicationController', 500, next);
    }
  }

  async application(req, res, next) {
    try {
      let application = await this.models.applications.find({slug : req.params.application} , (error , application) => {
        if (error) return this.error('Error in find website in applicationController', 500, next);
        if (this.isEmptyArray(application)) return this.error('Error in find website in applicationController', 404, next);
      })
      res.render('home/application/application', {
        title: 'وب سایت',
        application : application[0]
      });
    } catch (error) {
      return this.error('Error in application method in applicationController', 500, next);
    }
  }
}