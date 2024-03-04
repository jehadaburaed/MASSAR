const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const chatingController = require('../controller/chat.controller')


router.post("/sendMessage",auth(),chatingController.sendMessage);
router.get("/getChat",auth(),chatingController.getChat);
router.post("/deleteMessage",auth(),chatingController.deleteMessage);
router.get("/getPeopleContacted",auth(),chatingController.getContactedUsersData);



module.exports = router;