const upload = require("../middleware/upload");
const toursModel = require("../model/tours.model");
const toursData =require("../controller/tours.controller");
const value =require("../controller/tours.controller");

class toursService{
    static async createTour(userId,companyName, date, place, price, maxNumber,currentNumber , details,  image){
            const createAddTour = new toursModel({userId,companyName, date, place, price, maxNumber,currentNumber , details,  image});

        //    createAddTour.image =  "toString.value";
        //createAddTour.save;
          return  createAddTour;
    }

    static async getTour(userId){
        const getTour = await toursModel.find({userId})
        return getTour;
    }

   static async deleteTour(id){
        const deletTour = await toursModel.findByIdAndDelete({_id:id})
        return deletTour;
   }

   
   static async findOnee (obj){

    const tour = await toursModel.findOne(obj);
    return tour;

   }

   static async findTour (tourId){

    const tour = await toursModel.find({_id:tourId});
    return tour;

}

static async getAllTours(){
    try{
        return await toursModel.find({});
    }catch(err){
        console.log(err);
    }
}


   static async searchTour({ ...fields }){
    const searchObj = {};
    Object.entries(fields).map(field=>{
        // console.log(field)
        const [key, value] = field;
        searchObj[key] = {$regex:new RegExp(value, "i")}
    })
     
    const searchTour = await toursModel.find(searchObj)
    return searchTour;
}


   static async updateTour(id,userId,date, place, price,maxNumber,image){
    
    //return updateTour;
}
}
module.exports = toursService;