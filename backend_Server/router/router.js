/**
 * @Purpose : Create a router.js file to store all routes
 */ 
const controller = require('../controller/controller')
const express = require('express');

const router = express.Router();
// Registration
router.post('/register', controller.register);
// Login
router.post('/login', controller.login);
// ForgotPassword
router.post('/forgotPassword', controller.forgotPassword);
// ResetPassword
router.post('/resetPassword', controller.resetPassword);
module.exports = router;