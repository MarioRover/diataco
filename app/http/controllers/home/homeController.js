const controller = require('../controller');
const sm = require('sitemap');
const rss = require('rss');
const striptags = require('striptags');

module.exports = new class homeController extends controller {
  async showPage(req , res , next) {
    try {
      let homePage = await this.models.homePage.find({});
      let blogs = await this.models.blog.find({}).sort({
        createdDate: -1,
        createdTime: -1
      }).limit(4).populate({
        path: 'category',
        select: 'slug'
      });
      let websites = await this.models.websites.find({}).limit(8).sort({createdAt :-1}).exec();
      let applications = await this.models.applications.find({}).limit(8).sort({createdAt :-1}).exec();
      let siteInfo = await this.models.siteInfo.find({});
      if (this.isEmpty(siteInfo)) {
        siteInfo = 'undefined';
      } else {
        siteInfo = siteInfo[0]
      }
      if (this.isEmpty(homePage)) {
        homePage = 'undefined';
      } else {
        homePage = homePage[0];
      }
      if (this.isEmpty(blogs)) {
        blogs = 'undefined';
      }
      res.render('home/home', {
        title: 'Diata&#x2122; | Home of Diata , Design Website, Application, SEO | دیاتا - طراحی سایت ، اپلیکیشن ، سئو',
        homePage, blogs, websites, applications, siteInfo,
        tags : homePage.tags
      });
    } catch (error) {
      return this.error('Error in showPage method at homeController.js', 500, next);
    }
  }
  async sitemap(req , res , next) {
    try {
      let sitemap = sm.createSitemap({
        hostname : config.siteurl,
        cacheTime: 600000
      });
      sitemap.add({ url : '/' , changefreq : 'daily' , priority: 1 });
      sitemap.add({ url : '/about' , changefreq : 'monthly' , priority: 0.5 });
      sitemap.add({ url : '/contact' , changefreq : 'monthly' , priority: 0.5 });
      sitemap.add({ url : '/seo' , changefreq : 'monthly' , priority: 0.5 });

      let websites = await this.models.websites.find({}).sort({ createdAt : -1 }).exec();
      websites.forEach(website => {
        sitemap.add({ url : website.path() , changefreq : 'weekly' ,  priority: 0.8 });
      });
      let applications = await this.models.applications.find({}).sort({ createdAt : -1 }).exec();
      applications.forEach(app => {
        sitemap.add({ url : app.path() , changefreq : 'weekly' ,  priority: 0.8 });
      });
      let categories = await this.models.blogCategory.find({}).sort({ createdAt : -1 }).exec();
      categories.forEach(category => {
        sitemap.add({ url : category.path() , changefreq : 'weekly' ,  priority: 0.8 });
      });
      let blogs = await this.models.blog.find({}).populate('category').sort({ createdAt : -1 }).exec();
      blogs.forEach(blog => {
        sitemap.add({ url : `${blog.category.path()}/${blog.slug}` , changefreq : 'weekly' ,  priority: 0.8 });
      });

      res.header('Content-type' , 'application/xml');
      res.send(sitemap.toString());
      
    } catch (error) {
      return this.error('Error in sitemap method at homeController.js', 500, next);
    }
  }
  async feedWebsites(req, res, next) {
    try {
      let feed = new rss({
        title : 'فیلد خوان وب سایت های طراحی شده توسط وب سایت دیاتا',
        description : 'جدیدترین وب سایت های طراحی شده را در rss مشاهده کنید',
        feed_url : `${config.siteurl}/feed/websites`,
        site_url : config.siteurl,
        managingEditor : 'Hossein Akbari',
        webMaster : 'Hossein Akbari',
        language : 'fa',
        copyright : '2018 Diata'
      });
      let websites = await this.models.websites.find({}).populate('admin').sort({ createdAt : -1 }).exec();
      websites.forEach(website => {
        feed.item({
          title : website.name,
          description : striptags(website.desc.substr(0,100)),
          date: website.createdAt,
          url : website.path(),
          author : website.admin.family
        })
      });

      res.header('Content-type', 'application/xml');
      res.send(feed.xml());
    } catch (error) {
      return this.error('Error in feedWebsites method at homeController.js', 500, next);
    }
  }
  async feedApplications(req, res, next) {
    try {
      let feed = new rss({
        title : 'فیلد خوان اپلیکیشن های طراحی شده توسط وب سایت دیاتا',
        description : 'جدیدترین اپلیکیشن های طراحی شده را در rss مشاهده کنید',
        feed_url: `${config.siteurl}/feed/applications`,
        site_url : config.siteurl,
        managingEditor : 'Hossein Akbari',
        webMaster : 'Hossein Akbari',
        language : 'fa',
        copyright : '2018 Diata'
      });
      let applications = await this.models.applications.find({}).populate('admin').sort({ createdAt : -1 }).exec();
      applications.forEach(app => {
        feed.item({
          title : app.name,
          description : striptags(app.desc.substr(0,100)),
          date: app.createdAt,
          url : app.path(),
          author : app.admin.family
        })
      });

      res.header('Content-type', 'application/xml');
      res.send(feed.xml());
    } catch (error) {
      return this.error('Error in feedApplications method at homeController.js', 500, next);
    }
  }
  async feedBlogs(req, res, next) {
    try {
      let feed = new rss({
        title : 'فیلد خوان وبلاگ وب سایت دیاتا',
        description : 'جدیدترین بلاگ ها rss مشاهده کنید',
        feed_url: `${config.siteurl}/feed/blogs`,
        site_url : config.siteurl,
        managingEditor : 'Hossein Akbari',
        webMaster : 'Hossein Akbari',
        language : 'fa',
        copyright : '2018 Diata'
      });
      let blogs = await this.models.blog.find({}).populate('category').sort({ createdAt : -1 }).exec();
      blogs.forEach(blog => {
        feed.item({
          title: blog.title,
          description: blog.summery,
          date: blog.createdAt,
          url: `/${blog.category.slug}/${blog.slug}`
        })
      });

      res.header('Content-type', 'application/xml');
      res.send(feed.xml());
    } catch (error) {
      return this.error('Error in feedApplications method at homeController.js', 500, next);
    }
  }
}