const mongoose = require('mongoose');
const db = require('../config/db');


const calculateRating = async function () {
    const review = this;
  
    try {
      // Retrieve all reviews for the associated user
      const reviews = await db.model("rating").find({
        companyId: review.companyId,
      });
  
      console.log(reviews , review)
      // Calculate the average rating for the user
      if (reviews.length > 0) {
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );
        const averageRating = totalRating / reviews.length;
  
        // Update the user's average rating
        const user = await db.model("user").findById(review.companyId);
  
        if (user) {
          user.rating = averageRating;
          await user.save();
        }
      }
  
      // next();
    } catch (error) {
      // next(error);
      console.log("companies Reviews Middleware error", error);
    }
  };

  module.exports = calculateRating ;