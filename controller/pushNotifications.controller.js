var admin = require("firebase-admin");
var fcm = require("fcm-node");
const toursController = require('../controller/tours.controller')

var serviceAccount = require("../config/Push-Notifications-key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);
exports.sendPushNotification = (req, res, next) => {
try {
let message ={
    to: '/topics/'+req.body.topic,
    notification: {
    title: "NEW Notification",
    body: "The tour you registered in has been rescheduled or canceled",
    "click_action": "FCM_PLUGIN_ACTIVITY",
    "icon": "fcm_push_icon",

},
    data: {
    orderId: "123456", 
    orderDate: "2022-10-28"
},
   // token:req.body.fcm_token,
};


FCM.send (message, function (err, response) {
    //console.log(message)
    if(err) {
    return res.status (500).send ({
    message:"An error occurred while sending the notification"
     });
    }
    else {
        console.log('The tour you registered in has been rescheduled or canceled')
    return res.status (200).send ({
    message:  "The tour you registered in has been rescheduled or canceled"
});
    }
});


}
catch(err) {
    throw err;

}

};
