const db = require('../config/db');
const UserModel = require("./user.model");
const toursModel = require("./tours.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    notification:{
        type:String,
        required: true


    }
},{timestamps:true});

const notificationModel = db.model('notification',notificationSchema);
module.exports = notificationModel;