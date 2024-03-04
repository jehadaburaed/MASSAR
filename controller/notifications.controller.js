const notificationService = require('../services/notifications.service');

exports.addNotification =  async (req,res,next)=>{
    try {
        
        const { userId,notification } = req.body;
        let setNotification = await notificationService.addNotification(userId,notification);
        res.status(200).json({ message: "The notification has been stored and sent successfully",success:setNotification });
   
    } catch (error) {
        res.status(404)
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getNotification =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        let setData = await notificationService.getNotification(userId);
        res.status(200).json({ message: "The notifications has been displayed successfully",success:setData});
        
   
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.deleteNotification =  async (req,res,next)=>{
    try {

        const { id } = req.body;
        let deletedData = await notificationService.deleteNotification(id);
       
        res.status(200).json({ message: "The Notification has been deleted successfully", deletedData:deletedData });
        
        
   
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}