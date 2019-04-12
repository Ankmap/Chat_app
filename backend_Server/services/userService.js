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
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}
/**
 * @Purpose : For forgotPassword
**/
exports.forgotPassword = (req, callback) => {
    userModel.forgotPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}
/**
 * @Purpose : For resetPassword
**/
exports.resetPassword = (req, callback) => {
    userModel.resetPassword(req, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    });
}
/**
 * @Purpose : Get all data
**/
exports.data = (req, callback) => {
    userModel.data(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}