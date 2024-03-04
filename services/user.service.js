const UserModel = require("../model/user.model");
const ratigModel = require("../model/rating.model");
const jwt = require("jsonwebtoken");

class UserServices{
 
    static async registerUser(userName,email,phoneNumber,userType,age ,city ,gender ,password){
        try{
                console.log("-----Email --- Password-----",userName,email,phoneNumber,userType,age ,city ,gender ,password);
                
                const createUser = new UserModel({userName,email,phoneNumber,userType,age ,city ,gender ,password});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async getUserByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }

    static async getUserById(userId){
        try{
            return await UserModel.findOne({_id:userId});
        }catch(err){
            console.log(err);
        }
    }

    static async updateUserInfo( userName, email,phoneNumber, age ,city){
    
        //return updateUserInfo;
    }

    static async updateUserPassword(oldPassword , newPassword){
    
        //return updateUserInfo;
    }

    static async getCompanies(){
        try{
            return await UserModel.find({userType:"company"});
        }catch(err){
            console.log(err);
        }
    }

    static async checkUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }



    

       

        




}
module.exports = UserServices;