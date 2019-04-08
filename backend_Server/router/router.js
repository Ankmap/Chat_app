/**
 * @Purpose : Create a router.js file to store all routes
 */ 
const controller = require('../controller/controller')
const express = require('express');

const router = express.Router();
// Registration
router.post('/register', controller.register);
// Login
router.post('/login', controller.login)

module.exports = router;