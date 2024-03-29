/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - router.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
/**
 * @Purpose : Create a router.js file to store all routes
 */
const express = require('express');
const router = express.Router();
var chatController = require("../controller/chatController");
const controller = require('../controller/controller');
const authentication = require('../authentication/decode')
try {
    /**
     * @Purpose : Registration
     **/
    router.post('/register', controller.register);
    /**
     * @Purpose : Login
     **/
    router.post('/login', controller.login);
    /**
     * @Purpose : ForgotPassword
     **/
    router.post('/forgotPassword', controller.forgotPassword);
    /**
     * @Purpose : ResetPassword
     **/
    router.post('/resetPassword',authentication.checkToken,controller.resetPassword);
    /**
     * @Purpose : get data
     **/
    router.get('/getAllUser', controller.getAllUser);

    router.get('/getUserMsg', chatController.getUserMsg);
} catch (err) {
    console.log(err);
}

module.exports = router;