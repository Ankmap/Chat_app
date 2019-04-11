var userModel = require('../app/model/user.model');

exports.register = (req, callback) => {
    userModel.register(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.login = (req, callback) => {
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.forgotPassword = (req, callback) => {
    userModel.forgotPassword(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.resetPassword = (req, callback) => {
    userModel.resetPassword(req, (err, result) => {
        if (err) {
            //console.log("in error part");
            return callback(err);
        } else {
            //console.log("in result part");
            return callback(null, result);
        }
    })
}

exports.data = (req, callback) => {
    userModel.data(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}