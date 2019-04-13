
/**
 * @Purpose : express is node.js web application framework
 **/
const express = require('express');
const app = express();
/**
 * @Purpose : body-parser module parses the JSON, buffer, 
 *            string and URL encoded data submitted using HTTP POST/Get request.
 **/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * @Purpose : Validating input in Express using express-validator.
 **/
var expressValidator = require('express-validator')
app.use(expressValidator());
/**
 * @Purpose : Mongoose manages relationships between data, provides schema validation, and 
 *            used to translate between objects in code and represent objects in MongoDB.
 **/
const mongoose = require('mongoose');
/**
 * @Purpose : Calling router
 **/
const route = require('../backend_Server/router/router');
app.use('/', route);
/**
 * @Purpose : Connection with frontend_Client
 **/
app.use(express.static('../frontend_Client'));

/**
 * @Purpose : Connection with server
 **/
var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})
/**
 * @Purpose : Connection to the mongo database
 **/
const dbConfig = require('./config/database.config');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database...!");
}).catch(err => {
    console.log("Could not connect to the database....Start mongod\n Sudo service mongod start..!");
    process.exit();
});
/*-----------------------------------------Socket Connection --------------------------------------------------*/
/**
 * @Purpose : The frontend code for a web application served from XMLHttpRequest 
 *            to make a request for json.
 **/
const cors = require('cors');
app.use(cors())
const http = require('http'); //data communication
/**
 *@Purpose : Imporing socket io to get connection between client and server 
**/
//const server = require('http').createServer(app);
const io = require('socket.io')(server);
// var socketIO = require('socket.io');
console.log("Army.11111");
/**
 * The on() Method
This method will attach an event listener to the socket object, 
so we can utilize any data sent from the server: */
io.sockets.on('connection', function (socket) {
    console.log("Army111111111111111111111");
    console.log("Connected socket!");
    socket.on('disconnect', function () {
        console.log("Socket Disconnected!")
    });
});