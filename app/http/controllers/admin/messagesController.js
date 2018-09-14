const controller = require('../controller');


module.exports = new class messagesController extends controller {
  async index(req, res , next) {
    try {
      let messages = await this.models.Messages.find({})
      res.render('admin/messages', {
        title: 'پیام های دریافتی',
        activeRow: 'messages',
        messages 
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
      await this.models.Messages.findById(req.params.id , (err , message) => {
        if (err) return this.error(err.msg, 404, next);
        if (!message) return this.error('Error in find mongoid in messageController.js', 404, next);
        res.render('admin/message', {
          title: 'پیام های دریافتی',
          activeRow: 'messages',
          message
        });
      });
      
    } catch (error) {
      this.error('Error in viewMessage method at messageController.js', 500, next);
    }
  }
    
}
