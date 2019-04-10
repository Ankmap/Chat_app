/**
 * @Purpose : Create a router.js file to store all routes
 */ 
const controller = require('../controller/controller')
const express = require('express');
const token = require('../authentication/token')
const router = express.Router();

// Registration
router.post('/register', controller.register);
// Login
router.post('/login', controller.login);
// ForgotPassword
router.post('/forgotPassword',controller.forgotPassword);
// ResetPassword
router.post('/resetPassword',  controller.resetPassword);
//data token.generateToken,  
router.get('/data', controller.data);

module.exports = router;