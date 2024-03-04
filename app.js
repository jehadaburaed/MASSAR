const express = require("express");
const bodyParser = require("body-parser")
const UserRoute = require("./routers/user.routes");
const rating = require("./routers/rating.routes");
const toursRoute = require('./routers/tours.routes');
const chating = require('./routers/chat.routes');
const comments = require('./routers/comments.routes');
const notificationsRoutes = require('./routers/notifications.routes');
const joiningTourRoute = require('./routers/joiningTour.routes');
const app = express();

app.use(bodyParser.json())

app.use("/",UserRoute);
app.use("/",toursRoute);
app.use("/",chating);
app.use("/",comments);
app.use("/",rating);
app.use("/",joiningTourRoute);  
app.use("/",notificationsRoutes);
app.use('/uploads',express.static('uploads'))

module.exports = app;