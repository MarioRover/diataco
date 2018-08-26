const controller = require('./../controller');

class adminController extends controller {
  dashboard(req, res) {
    res.render('admin/dashboard' , {
      title : 'پنل مدیریت'
    });
  }
}

module.exports = new adminController();