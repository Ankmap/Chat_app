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

//const cors = require('cors');
//app.use(cors())

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

