const controller = require('../controller');

class aboutUs extends controller {
  async showPage(req, res, next) {
    try {
      let websites = await this.models.websites.find({}).limit(8).sort({createdAt :-1}).exec();
      if(this.isEmptyArray(websites)) {
        websites = 'undefined';
      }
      res.render('home/website', {
        title: 'وب سایت',
        websites
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new aboutUs();