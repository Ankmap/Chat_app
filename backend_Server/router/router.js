/**
 * @Purpose : Create a router.js file to store all routes
 */
const express = require('express');
const router = express.Router();
var chatController = require("../controller/chatController");
const controller = require('../controller/controller');

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
    router.post('/resetPassword',controller.resetPassword);
    /**
     * @Purpose : get data
     **/
    router.get('/getAllUser', controller.getAllUser);

    router.get('/getUserMsg', chatController.getUserMsg);
} catch (err) {
    console.log(err);
}

module.exports = router;