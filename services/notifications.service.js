const notificationModel = require("../model/notifications.model");
const UserServices = require('../services/user.service');


class notificationService{

   


        static async addNotification(userId,notification){
            const createNotification = new notificationModel({userId,notification});
            return await createNotification.save();
        }

        static async getNotification(userId){
          const findNotification = notificationModel.find({ userId });
          return await findNotification;
        }

        static async deleteNotification(id){
          const deleteNotification = await notificationModel.findOneAndDelete({_id: id});
          return deleteNotification;
    }


}


module.exports = notificationService;