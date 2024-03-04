/*

message value meaning :

1 : The company deleted the tour 
2 : The company deleted one of the participants in the tour 
3 : The company updated the tour information 
4 : One of the users registered in a tour
5 : One of the users unregistered in a tour
6 :

*/








var nodemailer = require('nodemailer');
require('dotenv').config();

exports.emailSender =  async (req,res,next)=>{
    try {

        const { userEmail,message } = req.body;
        
        var mailBody = "" ;
        
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            
            auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
            }
        });
        
        if      (message==1)
            mailBody='A tour you had previously registered in was deleted by the owner company. Go and check the tours you registered in!';
        else if (message==2)
            mailBody='Your registration has been deleted from a tour you were previously registered in. Go and check the tours you registered in!';
        else if (message==3)
            mailBody='Information for a tour you have previously registered in has been updated by the owner company. Go and check the tour you registered in!';
        else if (message==4)
            mailBody='A user has registered in a tour created by your company. Go and check the tours created by you!';
        else if (message==5)
            mailBody='One of the users who was registered in a tour created by your company has canceled his registration for the tour. Go and check the tours created by you!';

        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: userEmail,
            subject: ' Take a look at your tours !!! ',
            text: mailBody
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        


                res.json({status: true,success:"The email was sent successfully"});
            } catch (error) {
                console.log(error, 'err---->');
                next(error);
            }
}