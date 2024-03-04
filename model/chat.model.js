const db = require('../config/db');
const UserModel = require("./user.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatingSchema = new Schema({
    SenderId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    message:{
        type:String,
        required: true


    }
},{timestamps:true});

const chatModel = db.model('chat',chatingSchema);
module.exports = chatModel;