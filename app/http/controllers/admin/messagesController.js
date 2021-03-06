const controller = require('../controller');

module.exports = new class messagesController extends controller {
  async index(req, res , next) {
    try {
      let user = req.user;
      let page = req.query.page || 1;
      let messages = await this.models.Messages.paginate({} , {
        page , 
        sort : {
          createdAt: -1
        },
        limit : 10
      });
      res.render('admin/messages', {
        title: 'پیام های دریافتی',
        activeRow: 'messages',
        messages,user,
        manifest : this.Manifest
      });
    } catch (error) {
      this.error('Error in Index method at messageController.js' , 500 , next);
    }
  };

  async viewMessage(req , res , next) {
    try {
      let result = await this.isMongoId(req.params.id , next);
      if(! result ) {
        return this.error('Error in validate mongoid in messageController.js', 404, next);
      }
      let user = req.user;
      await this.models.Messages.findById(req.params.id , (err , message) => {
        if (err) return this.error(err.msg, 404, next);
        if (!message) return this.error('Error in find mongoid in messageController.js', 404, next);
        res.render('admin/message', {
          title: 'پیام های دریافتی',
          activeRow: 'messages',
          message,user,
          manifest : this.Manifest
        });
      });
      
    } catch (error) {
      this.error('Error in viewMessage method at messageController.js', 500, next);
    }
  };

  async destroy(req , res , next) {
    try {
      let result = await this.isMongoId(req.body.message, next);
      if (!result) {
        return this.serverError('Error in validate mongoid in messageController.js', 403, error, res);
      }
      await this.models.Messages.findById(req.body.message, (error, message) => {
        if (error) return this.serverError('Error in find message in destroy method at messageController.js', 500, error, res);
        if (!message) return this.serverError('not found message in destroy method at messageController.js', 404, error, res);
        message.remove();
        return this.deleteObj(['پیام شما با موفقیت حذف گردید'], 'success', req.body.message , 'row' , res);
      });

    } catch (error) {
      return this.serverError('Error in destroy method at messageController.js', 500, error, res);
    }
  }
    
}
