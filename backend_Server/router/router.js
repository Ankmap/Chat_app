/**
 * @Purpose : Create a router.js file to store all routes
 */ 
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const authroutes = require('../authentication/decode')

try{
// Registration
router.post('/register', controller.register);
// Login
router.post('/login', controller.login);
// ForgotPassword
router.post('/forgotPassword',controller.forgotPassword);
// ResetPassword
router.post('/resetPassword',  controller.resetPassword);
//data token.generateToken,  
router.get('/getAllUser', controller.data);
// authentication
router.use('/auth', authroutes);
}catch(err){
    console.log(err);
}

module.exports = router;