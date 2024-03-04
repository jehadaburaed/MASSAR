const joiningTourService = require('../services/joiningTour.service');
const toursModel = require("../model/tours.model");
const toursService = require('../services/tours.service');
const emailSender = require('../middleware/emailSender');
const joiningToursModel = require("../model/joiningTour.model");
exports.createJoiningTour =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        const { tourId } = req.body;
        
        const Authorization = await joiningTourService.findOne({
            tourId:tourId ,
            userId: req.user._id
         })
         console.log(Authorization);
         if (!Authorization){
                        let joiningTourData = await joiningTourService.createJoiningTour(userId,tourId);
                        
                        const tour = await toursModel.findOne({ _id: tourId });
                        const currentNumber = tour.currentNumber+1 ;
                        console.log(tour)
                        console.log(tour.currentNumber)

                        let updatedData = await toursModel.findOneAndUpdate({ _id: tourId }, {
                            currentNumber
                        
                    }, { new: true })
                        res.json({ status: true, success: updatedData }); 

                        res.json ({status: true,success: joiningTourData});
             }
             else  res.json ({status: false,success: "you are joined "});
        
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getJoiningTour =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        let getData = await joiningTourService.getJoiningTour(userId);
        res.json({status: true,success:getData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getUsersJoinedMyTour =  async (req,res,next)=>{
    try {
        const { tourId } = req.query;
        let getData = await joiningTourService.getUsersJoinedMyTour(tourId);

        //console.log(getData.userId);

        res.json({status: true,success:getData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deleteJoiningTour =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        
        const Authorization = await joiningTourService.findOne({
            tourId:id ,
            userId:req.user._id
           
         })
         

         if (Authorization){


            const tour = await toursModel.findOne({ _id: Authorization.tourId });
                        const currentNumber = tour.currentNumber-1 ;
                        console.log(tour)
                        console.log(tour.currentNumber)

                        let updatedData = await toursModel.findOneAndUpdate({ _id: Authorization.tourId }, {
                            currentNumber
                        
                    }, { new: true })
                        


                    let deletedData = await joiningToursModel.findOneAndDelete({tourId:id,userId:req.user._id});
                    console.log(deletedData)
                    res.json({status: true,success:deletedData});


         }
         else {res.json(' err----> you are not joining this tour ')}
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.deleteUserJoinedMyTour =  async (req,res,next)=>{
    try {
        const { tourId,userId } = req.body;

        var TourId =tourId;
        var UserId =userId;
        const Authorization = await joiningTourService.findOne({
            tourId:tourId ,
            userId:userId
         })
         console.log("Authorization:  ",Authorization)
         if (Authorization){
            const tour = await toursModel.findOne({ _id: Authorization.tourId });
                        const currentNumber = tour.currentNumber-1 ;
                        console.log(tour)
                        console.log(tour.currentNumber)

                        let updatedData = await toursModel.findOneAndUpdate({ _id: Authorization.tourId }, {
                            currentNumber
                        
                    }, { new: true })
                        res.json({ status: true, success: updatedData }); 


                    let deletedData = await joiningToursModel.findByIdAndDelete({ _id:Authorization._id })
                    
                    res.json({status: true,success:deletedData});

                    //emailSender.receiver= '';




         }
         else {res.json(' err----> you are not joining this tour ')}
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}