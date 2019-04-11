// importing express
var express = require('express');
var router = express.Router();
var users = require('../controller/controller');
var auth = require('../authentication/decode');
try {
    router.get('/getAllUser', auth, users.getAllUser);
}
catch (err) {
    console.log(err);
}
module.exports = router