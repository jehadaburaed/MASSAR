const app = require("./app");
const db = require('./config/db')
const UserModel=require('./model/user.model')
const toursModel=require('./model/tours.model')
var nodemailer = require('nodemailer');
require('dotenv').config();
const port = 3000;
const express = require("express");
var http = require("http");
const appio = express();
const portt = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);



app.get(`/`,(req,res)=>{
    res.send("hello love")
}
)
app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
})




/*


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




*/



//Socket


appio.use(express.json());
var clients = {};

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
  socket.on("notification", (ntf) => {
    console.log(ntf);
    let targetId = ntf.targetId;
    if (clients[targetId]) clients[targetId].emit("notification", ntf);
  });
});

server.listen(portt, "0.0.0.0", () => {
  console.log("server socket-io started");
});