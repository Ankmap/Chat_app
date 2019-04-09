var userService = require('../services/userService');
var access = require('../authentication/token');

module.exports.register = (req, res) => {
    req.checkBody('name', 'name is not valid').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 5 }).equals(req.body.confirmPassword);

    var errors = req.validationErrors();
    console.log(errors);
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send({
            message: errors
        });
    }
    else {
        userService.register(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                });
            }
        });
    }
};

module.exports.login = (req, res) => {
    var response = {};
    userService.login(req.body, (err, data) => {
        if (err) {
            response.success = false;
            response.error = err;
            res.status(500).send(response);
        }
        else {
            response.success = true;
            response.data = data;
            res.status(200).send({
                message: data,
                // "token": token
            });
        }
    })
}

module.exports.forgotPassword = (req, res) => {
    var response = {};
    userService.forgotPassword(req.body, (err, data) => {
        if (err) {
            response.success = false;
            response.error = err;
            res.status(500).send(response);
        }
        else {
            response.success = true;
            response.data = data;
            const payload = {
                user_id: data[0]._id
            }
            const token = access.generateToken(payload);
            // console.log(token);
            const url = `http://localhost:3000/resetPassword => ${token.token}`;
            //console.log( url);
            res.status(200).send({
                message: data,
                "token": token,
                "url": url
            });
        }
    })
}

module.exports.resetPassword = (req, res) => {
    userService.resetPassword(req.body, (err, data) => {
        var response = {};
        if (err) {
            response.success = false;
            response.error = err;
            res.status(500).send(response);
        } else {
            response.success = true;
            response.data = data;
            res.status(200).send(response);
        }
    });
}
module.exports.data = (req, res) => {
    userService.data(req, (err, data) => {
        var response = {};
        if (err) {
            return callback(err);
        } else {
            //  console.log(data);
            response.success = true;
            response.result = data;
            res.status(200).send(response);
        }
    })
}
