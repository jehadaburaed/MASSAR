
const chatModel = require("../model/chat.model");
const UserServices = require('../services/user.service');



class chatingService{


    static async sendMessage(SenderId,receiverId,message){
        const createChat = new chatModel({SenderId,receiverId,message});
      return await createChat.save();
}

    static async getChat(userId,receiverId){
        const findChat = chatModel.find({
          $or: [
              { SenderId: userId, receiverId: receiverId },
              { SenderId: receiverId, receiverId: userId }
          ]
      });
      return await findChat;
}


    static async deleteMessage(userId, id){
      const findMessage = await chatModel.find({_id: id, SenderId: userId});
      // Check if the array is empty
      if (findMessage.length === 0){
          console.log("No message found to delete");
          return null; 
      }
      const deleteMessage = await chatModel.findOneAndDelete({_id: id, SenderId: userId});
      return deleteMessage;
}

static async getPeopleContacted(userId) {
  const peopleContacted = await chatModel.aggregate([
      {
          $match: {
              $or: [
                  { SenderId: userId },
                  { receiverId: userId }
              ]
          }
      },
      {
          $group: {
              _id: null,
              contactedUsers: {
                  $addToSet: {
                      $cond: {
                          if: { $eq: ["$SenderId", userId] },
                          then: "$receiverId",
                          else: "$SenderId"
                      }
                  }
              }
          }
      },
      {
          $project: {
              _id: 0,
              contactedUsers: 1
          }
      }
  ]);

  // Extract contactedUsers array from the result (if exists)
  return peopleContacted.length > 0 ? peopleContacted[0].contactedUsers : [];
}

static async getContactedUsersData(userId) {
  const contactedUserIds = await this.getPeopleContacted(userId);
    
  const userDataPromises = contactedUserIds.map(id => UserServices.getUserById(id));
  
  const usersData = await Promise.all(userDataPromises);

  // Map over usersData to extract only "_id" and "userName"
  const simplifiedUsersData = usersData.map(user => {
      return {
          _id: user._id,
          userName: user.userName
      };
  });
  
  return simplifiedUsersData;



}









}

module.exports = chatingService;