var nodemailer = require('nodemailer');
require('dotenv').config();

const emailSender = async function () {
var receiver='';


var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});

var mailOptions = {
  from: process.env.USER_EMAIL,
  to: 'jehadraed123@gmail.com',
  subject: 'Take a look at your tours !!! ',
  text: 'A tour you were registered in has been deleted!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});




}

module.exports = emailSender ;