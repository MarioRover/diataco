const controller = require('../controller');

class homeController extends controller {
  async showPage(req , res , next) {
    try {
      let aboutUs = await this.models.aboutUs.find({});
      let parallax = await this.models.parallax.find({});
      let homeSlider = await this.models.homeSlider.find({});
      let ability = await this.models.ability.find({});
      let blogs = await this.models.blog.find({}).sort({
        createdDate: -1,
        createdTime: -1
      }).limit(4).populate({
        path: 'category',
        select: 'slug'
      });
      if (aboutUs == '') {
        aboutUs = 'undefined';
      } else {
        aboutUs = aboutUs[0];
      }
      if (parallax == '') {
        parallax = 'undefined';
      } else {
        parallax = parallax[0];
      }
      if (homeSlider == '') {
        homeSlider = 'undefined';
      } else {
        homeSlider = homeSlider[0];
      }
      if (ability == '') {
        ability = 'undefined';
      } else {
        ability = ability[0];
      }
      if (blogs == '') {
        blogs = 'undefined';
      }
      res.render('home/home', {
        title: 'Diata',
        aboutUs, parallax, homeSlider, ability,blogs
      });
    } catch (error) {
      return this.error('Error in showPage method at homeController.js', 500, next);
    }
  }
}

module.exports = new homeController();