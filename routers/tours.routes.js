const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const toursController = require('../controller/tours.controller')
const upload = require('../middleware/upload')


router.post("/AddTour", auth() ,upload.array('images'),toursController.createTour);

router.get('/getTour', auth() ,toursController.getTour)

router.post("/deleteTour" , auth() , toursController.deleteTour)

router.put("/updateTour", auth() ,upload.array('images'),toursController.updateTour)

router.put("/searchTour", auth() ,toursController.searchTour)

router.get('/findTour', auth() ,toursController.findTour)

router.get('/getAllTours', auth() ,toursController.getAllTours)

module.exports = router;