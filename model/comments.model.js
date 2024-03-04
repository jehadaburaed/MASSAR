const db = require('../config/db');
const UserModel = require("./user.model");
const toursModel = require("./tours.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    tourId:{
        type: Schema.Types.ObjectId,
        ref: toursModel.modelName,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    comment:{
        type:String,
        required: true


    }
},{timestamps:true});

const commentModel = db.model('comment',commentSchema);
module.exports = commentModel;