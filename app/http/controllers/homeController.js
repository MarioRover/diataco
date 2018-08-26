const controller = require('./controller');

class homeController extends controller {
  showPage(req , res) {
    res.render('home/home' , {
      title : 'Artakhe'
    });
  }
}

module.exports = new homeController();