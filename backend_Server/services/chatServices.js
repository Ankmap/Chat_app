/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - chatServices.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
const chatModel = require('../app/model/chat.model')
/**
 * @Purpose : For addMessage
 **/
exports.addMessage = (req, callback) => {
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            //console.log('Err : Backend Chat service',err);
            return callback(err)
        } else {
            //console.log('Result : Backend Chat service');
            return callback(null, data)
        }
    });
}
/**
 * @Purpose : For getUserMsg
 **/
exports.getUserMsg = (req, callback) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}
