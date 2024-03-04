const UserServices = require('../services/user.service');
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { userName,email,phoneNumber,userType,age ,city ,gender ,password } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${userName}, Already Registered`)
        }
        const response = await UserServices.registerUser(userName,email,phoneNumber,userType,age ,city ,gender ,password);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.getUserById =  async (req, res, next) => {
    try {
        var userId =req.user._id;
        let getData = await UserServices.getUserById(userId);
        res.json({ status: true, success: getData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
exports.getAnyUserById =  async (req, res, next) => {
    try {
        const  {userId}  =req.query;
        let getData = await UserServices.getUserById(userId);
        res.json({ status: true, success: getData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}



exports.getCompanies =  async (req, res, next) => {
    try {
        let query =  userModel.find({userType:"company"});;
        query = query.sort('-rating')
        const getData = await query ;
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< this is the sorted data  >>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(getData)
        res.json({ status: true, success: getData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.updateUserInfo = async (req, res, next) => {
    try {
        var userId =req.user._id;
        const { userName,email,phoneNumber,age ,city } = req.body;

        let updatedData = await userModel.findOneAndUpdate({ _id: userId }, {
            userName, email,
            phoneNumber, age ,city
        }, { new: true })


        res.json({ status: true, success: updatedData });

    } catch (error) {
        console.log(error, '<--------------- cannot update user info ------------>');
        next(error);
    }
}

exports.updateUserPassword = async (req, res, next) => {
    try {
        var userId =req.user._id;
        var userEmail =req.user.email;
        const { oldPassword , newPassword } = req.body;
        let user = await UserServices.checkUser(userEmail);
        const isPasswordCorrect = await user.comparePassword(oldPassword);
        console.log(isPasswordCorrect );

        if ( isPasswordCorrect ){
           
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword,salt);
            const new_Password = hash ; 

        let updatedData = await userModel.findOneAndUpdate({ _id: userId }, {
            password:new_Password
        }, { new: true })

        console.log( '<--------------- The password has been changed ------------>');
        res.json({ status: true, success: updatedData });
    }
    else throw console.log( '<--------------- The password you entered is incorrect ------------>');

    } catch (error) {
        console.log(error, '<--------------- cannot update user password ------------>');
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id,uname:user.userName,userType:user.userType,password:user.password};
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, ' err----> token ');
        next(error);
    }
}