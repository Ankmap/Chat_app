
/**
 * @Purpose : Node.js web application framework
 **/
const express = require('express');
const app = express();

/**
 * @Purpose : Node.js web application framework
 **/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var expressValidator = require('express-validator')
app.use(expressValidator());

const mongoose = require('mongoose');
const route = require('../backend_Server/router/router');

const cors = require('cors');
app.use(cors())

/**
 * @Purpose : Calling router
 **/

app.use('/', route);

var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})

/**
 * @Purpose : Connection to the mongo database
 **/
app.use(express.static('../frontend_Client'));

/**
 * @Purpose : Connection to the mongo database
 **/
const dbConfig = require('./config/database.config');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database...!");
}).catch(err => {
    console.log("Could not connect to the database....!");
    process.exit();
});
/*-----------------------------------------Socket Connection --------------------------------------------------*/

/**
 *@Purpose : To include the HTTP module
**/ 
const http = require('http');
/**
 *@Purpose : Imporing socket io to get connection between client and server 
**/
var socketIO = require('socket.io');

const io = require('socket.io')(server);

//console.log("HAHHAHAHAHAHAHAHHA");
/**
 * @Purpose : checking for events. connecton will be listening for incoming sockets.
**/
io.on('connection', function (socket) {
    console.log("HAHHAHAHAHAHAHAHHA");
    console.log("Connected socket!");
    socket.on('disconnect', function () {
        console.log("Socket Disconnected!")
    });
});