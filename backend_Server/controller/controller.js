/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - controller.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
/**
 * @Purpose : Required files services, Token generation, senemail
 */
var userService = require('../services/userService');
var access = require('../authentication/token');
var sendmail = require('../middleware/senemail');
var jwt =  require('jsonwebtoken')
/**
 * @Purpose : For register a new account
**/
module.exports.register = (req, res) => {
    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid..!(Password length must be 5)').isLength({ min: 5 }).equals(req.body.confirmPassword);
    /**
     * @Purpose : Check the validation
    **/
    var errors = req.validationErrors();
    console.log("Error in validation : " + errors);
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send({
            status: false,
            message: "Please enter the valid data..!"
        });
    }
    else {
        userService.register(req.body, (err) => {
            if (err) {
                //console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    status: true,
                    message: 'Account created sucessfully,,,!'
                });
            }
        });
    }
};
/**
 * @Purpose : For login an account
**/
module.exports.login = (req, res) => {
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 5 });

    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                var token = jwt.sign({ email: req.body.email, id: data[0]._id }, 'secret', { expiresIn:'2h' });
                return res.status(200).send({
                     message: data,
                    "token": token
                });
            }
        })
    }
};
/**
 * @Purpose : For forgotPassword 
**/
exports.forgotPassword = (req, res) => {
    var responseResult = {};
    userService.forgotPassword(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;

            const payload = {
                user_id: responseResult.result._id
            }
            console.log(payload);
            const token = access.generateToken(payload);
            console.log("controller token", token);
            const url = `http://localhost:3000/#/resetPassword/${token.token}`;
            sendmail.sendEMailFunction(req.body.email,url);
            res.status(200).send({
                status: true,
                message: "Reset password sent to your register email id successfully..!",
                Url: url
            });
        }
    })
}
/**
 * @Purpose : For resetPassword 
**/
exports.resetPassword = (req, res) => {
    var response = {};
    userService.resetPassword(req, (err, result) => {
        if (err) {
            response.success = false;
            response.error = err;
            res.status(500).send(response)
        }
        else {
            response.success = true;
            response.result = result;
            res.status(200).send(response);
        }
    })
}
/**
 * @Purpose : Get all data
**/
module.exports.getAllUser = (req, res) => {
    userService.getAllUser(req, (err, data) => {
        var response = {};
        if (err) {
            response.success = false;
            response.error = err;
            res.status(500).send(response);
        } else {
            response.success = true;
            response.result = data;
            res.status(200).send(response);
        }
    });
}
