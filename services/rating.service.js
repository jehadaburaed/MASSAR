
const ratigModel = require("../model/rating.model");

class rating {

static async setRating(userId,companyId,rating){
    try{

            console.log("-----userId --- companyId --- rating-----",userId,companyId,rating);

            const updateRating = await ratigModel.findOne({companyId,userId});

            if (updateRating){

                updateRating.rating = rating ;
                return await updateRating.save();
            }
            else {
            const createRating = new ratigModel ({userId,companyId,rating});
            return await createRating.save();
            }
    }catch(err){
        throw err;
   } }



   static async updateRating(ratingId,userId,rating){
    try{
        console.log("-----userId --- companyId --- rating-----",userId,companyId,rating);
            
            const updateRating = await ratigModel.findOne({_id:ratingId,userId});

            if (updateRating){

                updateRating.rating = rating ;
                return await updateRating.save();
            }

           
    }catch(err){
        throw err;
   } }



   static async getRating(companyId){
    try {
        return await ratigModel.find({companyId});
    } catch (error) {
        throw error;
    }
}



static async getNumberOfPeopleRated(companyId){
    try {
        return await ratigModel.countDocuments({ companyId: companyId });
    } catch (error) {
        throw error;
    }
}



}
module.exports =rating  ;