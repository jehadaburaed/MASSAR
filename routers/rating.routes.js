const { auth } = require("../middleware/auth.middleware");
const router = require("express").Router();
const ratingcontroller = require('../controller/rating.controller')

router.post("/setRating" , auth() , ratingcontroller.setRating)
router.get("/getNumberOfPeopleRated" , auth() , ratingcontroller.getNumberOfPeopleRated)



module.exports = router;