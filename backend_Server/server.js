/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - server.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@Since   - 2/04/2019
 **************************************************************************************************/
/*-----------------------------------------Required file express, bodyParser, ExpressValidator--------------------------------------------------*/
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
/*-----------------------------------------Connection with Mongodb--------------------------------------------------*/

/**
 * @Purpose : Mongoose manages relationships between data, provides schema validation, and 
 *            used to translate between objects in code and represent objects in MongoDB.
 **/
const mongoose = require('mongoose');
/**
 * @Purpose : Connection to the mongo database
 **/
const dbConfig = require('./config/database.config');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("\n Successfully connected to database...!");
}).catch(err => {
    console.log("Could not connect to the database....Start mongod\n Sudo service mongod start..!");
    process.exit();
});
/*-----------------------------------------Connection with server--------------------------------------------------*/
/**
 * @Purpose : Connection with server
 **/
var server = app.listen(3000, () => {
    console.log("\n Server is listening to port 3000");
})
/*-----------------------------------------Calling router and frontend connection--------------------------------------------------*/
/**
 * @Purpose : Calling router
 **/
const route = require('../backend_Server/router/router');
app.use('/', route);
/**
 * @Purpose : Connection with frontend_Client
 **/
app.use(express.static('../frontend_Client'));

/*-----------------------------------------Socket Connection --------------------------------------------------*/
/**
 * @Purpose :CORS uses additional HTTP headers to tell a browser to let a web application 
 * is running at one origin (domain) and have permission to access selected resources 
 * from a server at a different origin.
 **/ 
const cors = require('cors');
app.use(cors())
const http = require('http');

/**
 * @purpose : Required file chatController to add message
 **/
var chatController = require('./controller/chatController');
const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log("\n --------------------- Socket is connected now ---------------------");
    socket.on('createMessage', function (message) {
        chatController.message(message, (err, data) => {
            if (err) {
                console.log("Error in sending message:", err);
            } else {
                io.emit('newMessageSingle', message);
            }
        });
        socket.on('disconnect', function () {
            console.log("\n ================ Socket is disconnected now ================")
        });
    });
});