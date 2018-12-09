const controller = require('../controller');

module.exports = new class blogController extends controller {
  async index(req, res, next) {
    try {
      let categories = await this.models.blogCategory.find();
      let siteInfo = await this.models.siteInfo.find({});
      let blogPage = await this.models.blogPage.find({});
      if (this.isEmptyArray(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmptyArray(blogPage)) {
        blogPage = 'undefined';
      } else {
        blogPage = blogPage[0]
      }
      if(categories == '') {
        categories = 'undefined';
      }
      res.render('home/blog/category', {
        title: 'Blog in Diata | Official Diata&#x2122; | وبلاگ و خبرنامه های دیاتا',
        categories,siteInfo,blogPage,
        manifest : this.Manifest,
        descTags : blogPage.descTags,
        keyTags : blogPage.keyTags
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
        title : `Diata | ${categories[0].name} Category`,
        categories : categories[0],
        siteInfo,
        manifest : this.Manifest,
        descTags : categories[0].descTags,
        keyTags : categories[0].keyTags,
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
      res.render('home/blog/blog', {
        title : `Diata | ${blog[0].title}`,
        blog : blog[0],
        siteInfo,
        manifest : this.Manifest,
        descTags : blog[0].descTags,
        keyTags : blog[0].keyTags,
      });
    } catch (error) {
      return this.error('Error in showBlog method of blogController.js', 500, next);
    }
  }

}