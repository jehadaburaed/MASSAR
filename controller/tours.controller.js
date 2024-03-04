const toursService = require('../services/tours.service');
const toursModel = require("../model/tours.model");
const pushNotificationController = require("../controller/pushNotifications.controller");
const joiningTourModel = require("../model/joiningTour.model");
var value;
exports.createTour = async (req, res, next) => {
    if (req.user.userType == "company" ) {
    try {
        var userId =req.user._id;
        var companyName =req.user.userName;
        const currentNumber = 0 ;
        const {  date, place, price, maxNumber, details,  image } = req.body;

        let addTourData = await toursService.createTour(userId,companyName, date, place, price, maxNumber,currentNumber , details,  image);

        let path = '';
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + ',';

        });
        path = path.substring(0, path.lastIndexOf(","))
        addTourData.avatar = path;
        addTourData.image = path;

        addTourData.save();

        res.json({ success: true,imageBaseUrl:"http://localhost:3000/uploads", data: addTourData });
    
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }

}
else console.log(error, '<-----You are not a company , you cannot create a tour ---->');
}



exports.getTour = async (req, res, next) => {
    try {
        var userId =req.user._id;
        let getData = await toursService.getTour(userId);
        res.json({ status: true, success: getData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getAllTours =  async (req, res, next) => {
    try {
        let getData = await toursService.getAllTours();
        res.json({ status: true, success: getData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.findTour = async (req, res, next) => {
    try {
        const _id =req.query;
        let getData = await toursService.findTour(_id);
        res.json({ status: true, success: getData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deleteTour = async (req, res, next) => {

    const { id } = req.body;
            const forYou = await toursService.findOnee({
               _id:id ,
               userId: req.user._id
            })
           
            value=forYou;
            console.log("forYou : ", forYou)
    if (req.user.userType == "company" && forYou ) {
        try {   
            let deletTour = await joiningTourModel.findOneAndDelete({ tourId:id })
            let deletedData = await toursService.deleteTour(id);
            res.json({ status: true, success: deletedData,deletTour });
        } catch (error) {
            console.log(error, 'err---->');
            next(error);
        }
    }
    else { console.log('err----> you cannot delete ');
           res.json({ message:" you cannot delete " } )
}
}

exports.updateTour = async (req, res, next) => {
    try {
        var userId =req.user._id;
        const { id, date, place, price, maxNumber,details } = req.body;

        let updatedData = await toursModel.findOneAndUpdate({ _id: id }, {
             date,
            place, price, maxNumber,details
        }, { new: true })


        res.json({ status: true, success: updatedData });

    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.searchTour = async (req, res, next) => {
    try {

        let updatedData = await toursService.searchTour(req.body);


        res.json({ status: true, success: updatedData });

    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
