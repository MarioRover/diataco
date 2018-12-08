const controller = require('../../../controller');
const fs = require('fs');

module.exports = new class blogPageController extends controller {
  async index(req, res, next) {
    try {
      let user = req.user;
      let blogPage = await this.models.blogPage.find({});
      if (this.isEmpty(blogPage)) {
        blogPage = 'undefined';
      } else {
        blogPage = blogPage[0];
      }
      res.render('admin/siteSetting/pages/blog', {
        title: 'تنظیمات سایت',
        activeRow: 'site-pages',
        user,
        blogPage,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.serverError('Error in Index method at aboutPagesController.js', 500, error, res);
    }
  };
  async header(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.file)) fs.unlinkSync(req.file.path);
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      let contentObj = {
        title    : req.body.title
      }
      const imageUrl = req.file;
      let blogPage = await this.models.blogPage.find({});
      
      if(this.isEmpty(blogPage)) {
        if(!this.isEmpty(imageUrl)) {
          contentObj['imageUrl'] = {
            destination: await this.addressImage(imageUrl),
            originalname: imageUrl.originalname,
            path: imageUrl.path
          }
        }
        let newHomePage = new this.models.blogPage({ ...contentObj});
        await newHomePage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Blog page با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = blogPage[0]._id;
        if (imageUrl && typeof blogPage[0].imageUrl !== 'undefined') {
          if (blogPage[0].imageUrl.originalname === imageUrl.originalname) {
            await fs.unlinkSync(imageUrl.path);
          } else {
            if (await fs.existsSync(blogPage[0].imageUrl.path)) await fs.unlinkSync(blogPage[0].imageUrl.path);
            contentObj['imageUrl'] = {
              destination: await this.addressImage(imageUrl),
              originalname: imageUrl.originalname,
              path: imageUrl.path
            }
          }
        } else if (imageUrl && typeof blogPage[0].imageUrl == 'undefined') {
          contentObj['imageUrl'] = {
            destination: await this.addressImage(imageUrl),
            originalname: imageUrl.originalname,
            path: imageUrl.path
          }
        }
        await this.models.blogPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Blog page با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in parallax method at aboutPagesController.js', 500, error, res);
    }
  }
  async tags(req , res , next) {
    try {
      let contentObj = {
        descTags : req.body.descTags,
        keyTags  : req.body.keyTags
      };
      let blogPage = await this.models.blogPage.find({});;
      if(this.isEmpty(blogPage)) {
        let newBlogPage = new this.models.blogPage({ ...contentObj});
        await newBlogPage.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
        });
        return this.izitoastMessage(['قسمت Blog Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      } else {
        let objId = blogPage[0]._id;
        await this.models.blogPage.findByIdAndUpdate(objId, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['قسمت Blog Page Tags با موفقیت بروزرسانی شد'] , 'success' , res);
      }
    } catch (error) {
      return this.serverError('Error in tags method at blogPageController.js', 500, error, res);
    }
  }
}
