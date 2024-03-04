const db = require('../config/db');
const UserModel = require("./user.model");
const mongoose = require('mongoose');
const toursModel = require("./tours.model");
const { Schema } = mongoose;

const joiningTourSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    tourId: {
        type: Schema.Types.ObjectId,
        ref:toursModel.modelName,
        required: true
    }
},{timestamps:true});

const joiningTourModel = db.model('joiningTour',joiningTourSchema);
module.exports = joiningTourModel;