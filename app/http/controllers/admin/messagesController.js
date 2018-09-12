const controller = require('../controller');

module.exports = new class messagesController extends controller {
  index(req, res) {
    res.render('admin/messages' , {
      title : 'پیام های دریافتی',
      activeRow: 'messages',
    });
  }
  
  
}
