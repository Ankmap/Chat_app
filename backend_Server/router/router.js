/**
 * @Purpose : Create a router.js file to store all routes
 */
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const decode = require('../authentication/decode')

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
    router.post('/resetPassword', controller.resetPassword);
    /**
     * @Purpose : GetAllUser
     **/
    router.get('/getAllUser', decode, controller.data);
    /**
     * @Purpose : Authentication
     **/
    router.use('/auth', decode);
} catch (err) {
    console.log(err);
}
/**
 * @Purpose : Registration
**/
module.exports = router;