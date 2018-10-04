const controller = require('../controller');

module.exports = new class blogController extends controller {
  async index(req, res, next) {
    try {
      let categories = await this.models.blogCategory.find();
      if(categories == '') {
        categories = 'undefined';
      }
      res.render('home/blog/category', {
        title: 'وبلاگ',
        categories
      });
    } catch (error) {
      return this.error('Error in index method of blogController.js', 500, next);
    }
  }

  async showBlogs(req, res, next) {
    try {
      let categories = await this.models.blogCategory.find({ slug: req.params.category }).populate({
        path: 'blogs'
      }).exec();
      if(this.isEmptyArray(categories)) return this.error('Error in category blog in viewBlog.js', 404, next);
      if (categories == '') {
        categories = 'undefined';
      }
      res.render('home/blog/blogs', {
        title : categories[0].name,
        categories : categories[0]
      });
    } catch (error) {
      return this.error('Error in showBlogs method of blogController.js', 500, next);
    }
  }

  async showBlog(req , res , next) {
    try {
      let categories = await this.models.blogCategory.find({ slug: req.params.category });
      if(this.isEmptyArray(categories)) return this.error('Error in category blog in viewBlog.js', 404, next);
      let blog = await this.models.blog.find({ slug: req.params.blog }).populate({
        path : 'admin',
        select : 'name , family'
      }).populate({
        path : 'category',
        select : 'name'
      }).populate({
        path: 'updatedBy'
      }).exec();
      if(this.isEmptyArray(blog)) return this.error('Error in find blog in viewBlog.js', 404, next);
      return res.json(blog[0]);
      // res.render('home/blog/blogs', {
      //   title : categories[0].name,
      //   categories : categories[0]
      // });
    } catch (error) {
      return this.error('Error in showBlog method of blogController.js', 500, next);
    }
  }

}