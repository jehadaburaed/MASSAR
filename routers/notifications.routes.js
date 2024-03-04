const pushNotificationController = require("../controller/pushNotifications.controller");
const notificationController = require("../controller/notifications.controller");
const express = require("express");
const router = express.Router(); 
const { auth } = require("../middleware/auth.middleware");

//router.post ("/send-notification" , auth() , pushNotificationController.sendPushNotification);
router.post ("/addNotification" , auth() , notificationController.addNotification);
router.post ("/deleteNotification" , auth() , notificationController.deleteNotification);
router.get ("/getNotification" , auth() , notificationController.getNotification);

module. exports = router;