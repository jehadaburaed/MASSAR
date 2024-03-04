const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const joiningTourController = require('../controller/joiningTour.controller')
const emailSenderController = require('../controller/emailSender.controller')

router.post("/JoiningTour",auth(),joiningTourController.createJoiningTour);

router.get('/getJoiningTour',auth(),joiningTourController.getJoiningTour)

router.get('/getUsersJoinedMyTour',auth(),joiningTourController.getUsersJoinedMyTour)

router.post("/deleteJoiningTour",auth(),joiningTourController.deleteJoiningTour)

router.post("/deleteUserJoinedMyTour",auth(),joiningTourController.deleteUserJoinedMyTour)

router.post("/emailSender",emailSenderController.emailSender)


module.exports = router;