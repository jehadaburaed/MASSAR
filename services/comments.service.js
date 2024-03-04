const commentModel = require("../model/comments.model");
const UserServices = require('../services/user.service');


class commentService{

   


        static async addComment(tourId,userId,comment){
            const createcomment = new commentModel({tourId,userId,comment});
          return await createcomment.save();
        }


}


module.exports = commentService;