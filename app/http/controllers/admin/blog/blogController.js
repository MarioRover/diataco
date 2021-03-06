const controller = require('../../controller');
const fs = require('fs');
const isEmptyObject = require('is-empty-object');

module.exports = new class blogController extends controller {
  async index(req, res, next) {
    try {
      let page = req.query.page || 1;
      let categories = await this.models.blogCategory.paginate({} , {
        page,
        sort : {
          createdAt: -1
        },
        limit : 10
      })
      let user = req.user;
      if(categories == '') {
        categories = 'undefined';
      }
      res.render('admin/blog/index', {
        title: 'وبلاگ',
        activeRow: 'blog',
        user, categories,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in index method of blogController.js' , 500 , next);
    }
  }
  async viewCreateCategory(req, res, next) {
    try {
      let user = req.user;
      res.render('admin/blog/CreateCategory', {
        title: 'ساخت دسته بندی وبلاگ جدید',
        activeRow: 'blog',
        user,
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in index method of blogController.js', 500, next);
    }
  }
  async createCategory(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.files['previewImage'])) {
          fs.unlinkSync(req.files['previewImage'][0].path);
        }
        if(!this.isEmpty(req.files['wallpaper'])) {
          fs.unlinkSync(req.files['wallpaper'][0].path);
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,slug,desc,descTags,keyTags} = req.body;
      let contentObj = {name,slug,desc,descTags,keyTags,admin : req.user._id};
      const previewImage = req.files['previewImage'][0];
      const wallpaper = req.files['wallpaper'][0];
      // check slug
      let categoryDuplicate = {
        slug : await this.models.blogCategory.find({ slug: slug } , (error , category) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return category;
        }),
        name : await this.models.blogCategory.find({ name: name } , (error , category) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return category;
        })
      }
      let message = [];
      if (!this.isEmptyArray(categoryDuplicate.name)) message.push('نام دسته بندی وارد شده قبلا ثبت شده است')
      if (!this.isEmptyArray(categoryDuplicate.slug)) message.push('اسلاگ دسته بندی وارد شده قبلا ثبت شده است');
      if (!this.isEmptyArray(message)) {
        fs.unlinkSync(previewImage.path);
        fs.unlinkSync(wallpaper.path);
        return this.izitoastMessage(message , 'warning', res);
      } else {
        contentObj['previewImage'] = {
          destination: this.addressImage(previewImage),
          originalname: previewImage.originalname,
          path: previewImage.path
        }
        contentObj['wallpaper'] = {
          destination: this.addressImage(wallpaper),
          originalname: wallpaper.originalname,
          path: wallpaper.path
        }
        let newCategory = new this.models.blogCategory({ ...contentObj });
        newCategory.save(err => {
          if (err) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
            return this.redirectWithMessage(['دسته بندی با موفقیت ثبت گردید'], 'success', '/admin/blogs/categories', res);
        });
      }
      
    } catch (error) {
      return this.serverError('Error in createCategory method of blogController.js', 500, error , res);
    }
  }
  async viewCategory(req , res , next) {
    try {
      let user = req.user;
      let category = await this.models.blogCategory.find({slug : req.params.category})
      .populate({
        path: 'admin',
        select : 'name , family'
      }).populate({
        path: 'blogs',
        populate : {
          path : 'admin',
          select : 'name , family'
        },
        sort: {
          createdDate: -1,
          createdTime: -1
        }
      }).exec();
      if (this.isEmptyArray(category)) return this.error('Error in find category in viewCategory.js', 404, next);
      res.render('admin/blog/category', {
        title: 'ساخت دسته بندی وبلاگ جدید',
        activeRow: 'blog',
        user,
        category : category[0],
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in index method of blogController.js', 500, next);
    }
  }
  async updateCategory(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.files['previewImage'])) {
          fs.unlinkSync(req.files['previewImage'][0].path);
        }
        if(!this.isEmpty(req.files['wallpaper'])) {
          fs.unlinkSync(req.files['wallpaper'][0].path);
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {name,slug,desc,descTags,keyTags} = req.body;
      let contentObj = {name,slug,desc,descTags,keyTags};
      let previewImage,wallpaper;

      if (!this.isEmpty(req.files['previewImage'])) {
        previewImage = req.files['previewImage'][0];
      }
      if(!this.isEmpty(req.files['wallpaper'])) {
        wallpaper = req.files['wallpaper'][0];
      }

      let thisCategory = await this.models.blogCategory.find({ slug: req.params.slug } , (error , category) => {
        if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
        return category;
      });      
      // check slug & name
      let categoryDuplicate = {
        slug : await this.models.blogCategory.find({ slug: slug } , (error , category) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return category;
        }),
        name : await this.models.blogCategory.find({ name: name } , (error , category) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return category;
        })
      }
      let message = [];
      if (!this.isEmptyArray(categoryDuplicate.name)) {
        if (String(categoryDuplicate.name[0]._id) !== String(thisCategory[0]._id)) {
          message.push('نام دسته بندی وارد شده قبلا ثبت شده است');
        }
      } 
      if (!this.isEmptyArray(categoryDuplicate.slug)) {
        if (String(categoryDuplicate.slug[0]._id) !== String(thisCategory[0]._id)) {
          message.push('اسلاگ دسته بندی وارد شده قبلا ثبت شده است');
        }
      } 
      if (!this.isEmptyArray(message)) {
        if (!isEmptyObject(req.files)) {
          fs.unlinkSync(previewImage.path);
          fs.unlinkSync(wallpaper.path);
        }
        return this.izitoastMessage(message , 'warning', res);
      } else {
        
        if (!isEmptyObject(req.files)) {
          
          if(!this.isEmpty(req.files['previewImage'])) {
            if (thisCategory[0].previewImage.originalname === previewImage.originalname) {
              await fs.unlinkSync(previewImage.path);
            } else {
              if (await fs.existsSync(thisCategory[0].previewImage.path)) await fs.unlinkSync(thisCategory[0].previewImage.path);
              contentObj['previewImage'] = {
                destination: this.addressImage(previewImage),
                originalname: previewImage.originalname,
                path: previewImage.path
              }
            }
          }

          if(!this.isEmpty(req.files['wallpaper'])) {
            if (thisCategory[0].wallpaper.originalname === wallpaper.originalname) {
              await fs.unlinkSync(wallpaper.path);
            } else {
              if (await fs.existsSync(thisCategory[0].wallpaper.path)) await fs.unlinkSync(thisCategory[0].wallpaper.path);
              contentObj['wallpaper'] = {
                destination: this.addressImage(wallpaper),
                originalname: wallpaper.originalname,
                path: wallpaper.path
              }
            }
          }

          
        }
        await this.models.blogCategory.findByIdAndUpdate(thisCategory[0]._id, {
          $set: { ...contentObj,...contentObj}
        });
        return this.izitoastMessage(['تغییرات با موفقیت ثیت گردید'] , 'success' , res);
      }

    } catch (error) {
      return this.serverError('Error in updateCategory method of blogController.js', 500, error, res);
    }
  }
  async removeCategory(req, res, next) {
    try {
      req.body.forEach(async category => {
        let cat = await this.models.blogCategory.findById(category).populate('blogs').exec();
        cat.blogs.forEach(async blog => {
          await this.models.blog.findByIdAndDelete(blog._id);
          await fs.unlinkSync(blog.imageUrl.path);
        });
        await fs.unlinkSync(cat.wallpaper.path);
        await fs.unlinkSync(cat.previewImage.path);
        await this.models.blogCategory.findByIdAndDelete(cat._id);
      });
      return this.deleteObj(['دسته بندی مورد نظر با موفقیت حذف گردید'], 'success', req.body, 'box', res);
    } catch (error) {
      this.error('Error in removeCategory method at blogController.js', 500, next);
    }
  }
  async viewCreateBlog(req , res , next) {
    try {
      let category = await this.models.blogCategory.find({ slug: req.params.category });
      if (this.isEmptyArray(category)) return this.error('Error in find category in viewCategory.js', 404, next);
      let user = req.user;
      res.render('admin/blog/addBlog', {
        title: 'ساخت وبلاگ جدید',
        activeRow: 'blog',
        user , category : category[0],
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in index method of blogController.js', 500, next);
    }
  }
  async createBlog(req, res, next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.files['previewImage'])) {
          fs.unlinkSync(req.files['previewImage'][0].path);
        }
        if(!this.isEmpty(req.files['wallpaper'])) {
          fs.unlinkSync(req.files['wallpaper'][0].path);
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {title,slug,summery,description,tags,descTags,keyTags} = req.body;
      const previewImage = req.files['previewImage'][0];
      const wallpaper = req.files['wallpaper'][0];
      // check slug
      let blogDuplicate = {
        slug : await this.models.blog.find({ slug: slug } , (error , blog) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return blog;
        })
      }
      let message = [];
      if (!this.isEmptyArray(blogDuplicate.slug)) message.push('اسلاگ بلاگ وارد شده قبلا ثبت شده است');
      if (!this.isEmptyArray(message)) {
        if (!this.isEmpty(req.files['previewImage'])) {
          fs.unlinkSync(req.files['previewImage'][0].path);
        }
        if(!this.isEmpty(req.files['wallpaper'])) {
          fs.unlinkSync(req.files['wallpaper'][0].path);
        }
        return this.izitoastMessage(message , 'warning', res);
      } else {
        let category = await this.models.blogCategory.find({slug : req.params.category} , (error , category) =>  {
        if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return category;
        });
        let contentObj = {
          title, slug, summery, description, tags,descTags,keyTags,
          admin: req.user._id,
          category: category[0]._id
        };
        contentObj['previewImage'] = {
          destination: this.addressImage(previewImage),
          originalname: previewImage.originalname,
          path: previewImage.path
        }
        contentObj['wallpaper'] = {
          destination: this.addressImage(wallpaper),
          originalname: wallpaper.originalname,
          path: wallpaper.path
        }
        let newBlog = new this.models.blog({ ...contentObj });
        newBlog.save(error => {
          if (error) {
            return this.serverError('ذخیره اطلاعات با مشکل مواجه شد', 500, error, res);
          }
            return this.redirectWithMessage(['بلاگ با موفقیت ثبت گردید'], 'success', `/admin/blogs/categories/${req.params.category}`, res);
        });
      }  
    } catch (error) {
      return this.serverError('Error in saveBlog method of blogController.js', 500, error, res);
    }
  }
  async deleteBlog(req , res , next) {
    try {
      let result = await this.isMongoId(req.body.blog, next);
      if (!result) {
        return this.serverError('Error in validate mongoid in messageController.js', 403, error, res);
      }
      let blog = await this.models.blog.findById(req.body.blog, (error, blog) => {
        if (error) return this.serverError('Error in find message in deleteBlog method at blogController.js', 500, error, res);
        if (!blog) return this.serverError('not found message in deleteBlog method at blogController.js', 404, error, res);
        return blog;
      });
      await fs.unlinkSync(blog.wallpaper.path);
      await fs.unlinkSync(blog.previewImage.path);
      blog.remove();
      return this.deleteObj(['پیام شما با موفقیت حذف گردید'], 'success', req.body.blog, 'row', res);
    } catch (error) {
      return this.serverError('Error in deleteBlog method at blogController.js', 500, error, res);
    }
  }
  async viewBlog(req , res , next) {
    try {
      let blog = await this.models.blog.find({ slug: req.params.blog }).populate({
        path : 'admin',
        select : 'name , family'
      }).populate({
        path : 'category',
        select : 'name , slug'
      }).populate({
         path: 'updatedBy',
         select: 'name , family'
      }).exec();
      if (blog[0].category.slug !== req.params.category) return this.error('Error in find category in viewBlog.js', 404, next);
      if (this.isEmptyArray(blog)) return this.error('Error in find blog in viewBlog.js', 404, next);
      let user = req.user;
      res.render('admin/blog/blog', {
        title: 'ساخت وبلاگ جدید',
        activeRow: 'blog',
        user , blog : blog[0],
        manifest : this.Manifest
      });
    } catch (error) {
      return this.error('Error in index method of blogController.js', 500, next);
    }
  }
  async updateBlog(req , res , next) {
    try {
      let result = await this.validationData(req, next);
      if (!result) {
        if (!this.isEmpty(req.files['previewImage'])) {
          fs.unlinkSync(req.files['previewImage'][0].path);
        }
        if(!this.isEmpty(req.files['wallpaper'])) {
          fs.unlinkSync(req.files['wallpaper'][0].path);
        }
        return this.izitoastMessage(req.flash('errors'), 'warning', res);
      }
      const {title,slug,summery,description,tags,descTags,keyTags} = req.body;
      let previewImage,wallpaper;

      if (!this.isEmpty(req.files['previewImage'])) {
        previewImage = req.files['previewImage'][0];
      }
      if(!this.isEmpty(req.files['wallpaper'])) {
        wallpaper = req.files['wallpaper'][0];
      }
      let thisBlog = await this.models.blog.find({ slug: req.params.blog } , (error , blog) => {
        if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
        return blog;
      });
      // check slug
      let blogDuplicate = {
        slug : await this.models.blog.find({ slug: slug } , (error , blog) => {
          if (error) return this.serverError('جستجو اطلاعات با مشکل مواجه شد', 500, error, res);
          return blog;
        })
      }
      let message = [];
      if (!this.isEmptyArray(blogDuplicate.slug)) {
        if (String(blogDuplicate.slug[0]._id) !== String(thisBlog[0]._id)) {
          message.push('اسلاگ بلاگ وارد شده قبلا ثبت شده است');
        }
      }
      if (!this.isEmptyArray(message)) {
        if (!this.isEmpty(req.files['previewImage'])) {
          fs.unlinkSync(req.files['previewImage'][0].path);
        }
        if(!this.isEmpty(req.files['wallpaper'])) {
          fs.unlinkSync(req.files['wallpaper'][0].path);
        }
        return this.izitoastMessage(message , 'warning', res);
      } else {
        let contentObj = {
          title, slug, summery, description, tags,descTags,keyTags,
          updatedBy : req.user._id
        };
        if (!isEmptyObject(req.files)) {

          if (!this.isEmpty(req.files['previewImage'])) {
            if (thisBlog[0].previewImage.originalname === previewImage.originalname) {
              await fs.unlinkSync(previewImage.path);
            } else {
              if (await fs.existsSync(thisBlog[0].previewImage.path)) await fs.unlinkSync(thisBlog[0].previewImage.path);
              contentObj["previewImage"] = { destination: this.addressImage(previewImage), originalname: previewImage.originalname, path: previewImage.path };
            }
          }
          if(!this.isEmpty(req.files['wallpaper'])) {
            if (thisBlog[0].wallpaper.originalname === wallpaper.originalname) {
              await fs.unlinkSync(wallpaper.path);
            } else {
              if (await fs.existsSync(thisBlog[0].wallpaper.path)) await fs.unlinkSync(thisBlog[0].wallpaper.path);
              contentObj["wallpaper"] = { destination: this.addressImage(wallpaper), originalname: wallpaper.originalname, path: wallpaper.path };
            }
          }

        }
        await this.models.blog.findByIdAndUpdate(thisBlog[0]._id, {
          $set: { ...contentObj, ...contentObj }
        });
        return this.redirectWithMessage(["تغییرات با موفقیت ثیت گردید"], "success", `/admin/blogs/categories/${req.params.category}`, res);
      }  
    } catch (error) {
      return this.serverError('Error in saveBlog method of blogController.js', 500, error, res);
    }
  } 
}



