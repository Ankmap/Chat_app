/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - userServices.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
/**
 * @Purpose : Required file
 */
var userModel = require('../app/model/user.model');
/**
 * @Purpose : For register a new account
**/
exports.register = (req, callback) => {
    userModel.register(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
/**
 * @Purpose : For login an account
**/
exports.login = (req, callback) => {
    //console.log("login service",req);
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}
/**
 * @Purpose : For forgotPassword
**/
exports.forgotPassword=(data,callback)=>{
    userModel.forgotPassword(data,(err,result)=>{
        if(err){
            callback(err);
        }else {
            callback(null,result)
        }
    })
}
/**
 * @Purpose : For resetPassword
**/
exports.resetPassword = (req, callback) => {
    userModel.resetPassword(req, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null,result);
        }
    });
}
/**
 * @Purpose : Get all data
**/
exports.getAllUser = (req, callback) => {
    userModel.getAllUser(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}