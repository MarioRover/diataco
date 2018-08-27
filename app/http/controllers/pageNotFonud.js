const controller = require('./controller');

class pageNotFonud extends controller {
  showPage(req , res) {
    res.status(404).render('pageNotFound', {
      title : 'صفحه مورد نظر یافت نشد'
    });
  }
}

module.exports = new pageNotFonud();