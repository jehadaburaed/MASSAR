
const joiningTourModel = require("../model/joiningTour.model");
const toursModel = require("../model/tours.model");


class joiningTourService{
    static async createJoiningTour(userId,tourId){
            const createJoiningTour = new joiningTourModel({userId,tourId});
          return await createJoiningTour.save();
    }

    static async getJoiningTour(userId){
        const getTour = await joiningTourModel.find({userId})
        return getTour;
    }

    static async deleteJoiningTour(id){
        const deletTour = await joiningTourModel.findByIdAndDelete({_id:id})
        return deletTour;
   }

   static async deleteUserJoinedMyTour(tourId,userId){
    const deletTour = await joiningTourModel.findByIdAndDelete({ tourId:tourId, userId:userId })
    return deletTour;
}

   static async findOne (obj){

    const tour = await joiningTourModel.findOne(obj);
    return tour;

   }
   static async getUsersJoinedMyTour (tourId){
    const tour = await joiningTourModel.find({tourId:tourId}).select("userId");
    return tour;

}


   static async findTour (id){

    const tour = await addTourModel.findOne({_id:id});
    return tour;

}


}
module.exports = joiningTourService;

