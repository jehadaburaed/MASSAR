
const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const calculateRating = require('../middleware/ratingMath');
const { Schema } = mongoose;
 

const ratingSchema = new Schema({
    userId: {
            type: Schema.Types.ObjectId
    },
    companyId:
    {
            type: Schema.Types.ObjectId  
    },
    rating: {
            type: Number,
            required: [true, 'A rating is required.'],
            min: [1, 'A minimum rating of "1" is required.'],
            max: [5, '"5" is the maximum rating.']
    }
   
  });


/*// Round entered rating to nearest integer before saving to db.
ratingSchema.pre('save', function(next) {
    Math.round(this.rating);
    next();
  });*/
  
  ratingSchema.post("save",calculateRating);



const ratigModel = db.model('rating',ratingSchema);
module.exports = ratigModel;