const db = require('../config/db');
const UserModel = require("./user.model");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const addTourSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    companyName: {
        type:  String ,
        required: true
    },
    date: {
        type:  String ,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    maxNumber:{
        type:Number,
        required: true
    },
    currentNumber:{
        type:Number,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image :{
        type:String,
        required:true
    }
},{timestamps:true});

const addTourModel = db.model('Tour',addTourSchema);
module.exports = addTourModel;