const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName:
    {
        required: [true, "userName can't be empty"],
        unique: true,
        type: String,


    },
    email: 
    {
        type: String,
        lowercase: true,
        required: [true, "email can't be empty"],
        // @ts-ignore
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "email format is not correct",
        ],
        unique: true,
    },
    phoneNumber:
    {
        required: [true, "phoneNumber can't be empty"],
        unique: true,
        type:String,


    },
    userType:
    {
        required: [true, "userType can't be empty"],
        type: String,


    },
    age:
    {
        required: [true, "Number can't be empty"],
        type: Number,


    },
    city:
    {
        required: [true, "city can't be empty"],
        type: String,


    },
    gender:
    {
        required: [true, "gender can't be empty"],
        type: String,


    },
    password: 
    {
        type: String,
        required: [true, "password is required"],
    },
    rating:
    {
        type: Number
    }
},{timestamps:true});













// used while encrypting user entered password
userSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);

        user.password = hash;
    }catch(err){
        throw err;
    }
});


//used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
       
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        if (isMatch){
            console.log('----------------Done and the password is ',this.password);
        }
        return isMatch;
        
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('user',userSchema);

module.exports = UserModel;
