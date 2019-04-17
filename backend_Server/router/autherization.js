var express = require('express');
var router = express.Router();
var users = require('../controller/controller');
var chatController = require("../controller/chatController");

try {
    router.get('/getAllUser',users.getAllUser);
    router.get('/getUserMsg',chatController.getUserMsg);
} catch (err) {
    console.log(err);
}

module.exports = router