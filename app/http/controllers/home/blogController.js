const controller = require('../controller');

module.exports = new class blogController extends controller {
  async index(req, res, next) {
    try {
      let categories = await this.models.blogCategory.find();
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if(categories == '') {
        categories = 'undefined';
      }
      res.render('home/blog/category', {
        title: 'وبلاگ',
        categories,siteInfo
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
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if(this.isEmptyArray(categories)) return this.error('Error in category blog in viewBlog.js', 404, next);
      if (categories == '') {
        categories = 'undefined';
      }
       categories[0].viewCount += 1;
       categories[0].save();
      res.render('home/blog/blogs', {
        title : categories[0].name,
        categories : categories[0],
        siteInfo
      });
    } catch (error) {
      return this.error('Error in showBlogs method of blogController.js', 500, next);
    }
  }

  async showBlog(req , res , next) {
    try {
      let categories = await this.models.blogCategory.find({ slug: req.params.category });
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
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
      blog[0].viewCount += 1;
      blog[0].save();
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