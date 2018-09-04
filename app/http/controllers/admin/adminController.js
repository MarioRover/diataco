const controller = require('./../controller');

class adminController extends controller {
  dashboard(req, res) {
    res.render('admin/dashboard' , {
      title : 'پنل مدیریت',
      activeRow: 'dashbaord',
    });
  }
  
  
}

module.exports = new adminController();