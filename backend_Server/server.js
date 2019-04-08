const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var expressValidator = require('express-validator')
app.use(expressValidator());

const mongoose = require('mongoose');
const route = require('../backend_Server/router/router');

const logger = require('morgan');
app.use(logger('dev'));

var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})

/**
 * @Purpose : Calling router
 **/
app.use('/', route);

app.use(express.static('frontend_Client'));

const cors = require('cors');
app.use(cors())

const dbConfig = require('./config/database.config');

app.use(express.static('../frontend_Client'));

/**
 * @Purpose : Connection to the mongo database
 **/
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database...!");
}).catch(err => {
    console.log("Could not connect to the database....!");
    process.exit();
});

