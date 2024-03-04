const ratingService = require('../services/rating.service');



exports.setRating =  async (req,res,next)=>{
    try {
        const {  companyId, rating} = req.body;
        var userId =req.user._id;
        let getData = await ratingService.setRating(userId,companyId,rating);
        res.json({status: true,success:getData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.updateRating =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        const {  ratingId, rating} = req.body;
        let getData = await ratingService.updateRating(ratingId,userId,rating);
        res.json({status: true,success:getData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}



exports.getNumberOfPeopleRated =  async (req,res,next)=>{
    try {
        const {  companyId} = req.query;
        let getData = await ratingService.getNumberOfPeopleRated(companyId);
        res.json({status: true,success:getData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
