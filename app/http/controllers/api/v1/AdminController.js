const Controller = require('../Controller');


module.exports = new class AdminController extends Controller {
  admin(req, res, next) {
    try {
      res.json({
        data : this.filterAdmin(req.admin),
        status : 'ok'
      })
    } catch (error) {
      return this.error(error.message, res);
    }
  }

  filterAdmin(admin) {
    return {
      name : admin.name,
      family : admin.family,
      email : admin.email,
      profileImage: admin.profileImg.destination
    }
  }

}