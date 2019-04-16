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
                    status:true,
                    message: 'Login Successfully...!',
                    "token": token
                });
            }
        })
    }
};
/**
 * @Purpose : For forgotPassword 
**/
module.exports.forgotPassword = (req, res) => {
    userService.forgotPassword(req.body, (err, data) => {
        console.log(req.body.email)
        var response = {};
        if (err) {
            return res.status(500).send({
                message: err
            });
        }
        else {
            response.success = true;
            response.data = data;
            console.log("Data", data[0]._id);
            /**
             * @Purpose : payload for token 
             *  Token : payload, secretkey, expiresIn
            **/
            const payload = {
                user_id: data[0]._id
            }
            /**
             * @Purpose : Store  generateToken in token variable
            **/
            const token = access.generateToken(payload);
            console.log(token);
            const url = `http://localhost:3000/#/resetPassword/${token.token}`;
            /**
             * @Purpose : Send Email
            **/
            sendmail.sendEMailFunction(req.body.email,url);
            //console.log( url);
            res.status(200).send({
                status: true,
                message: "Reset password sent to your register email",
                Url: url
            });
        }
    })
}
/**
 * @Purpose : For resetPassword 
**/
module.exports.resetPassword = (req, res) => {
    userService.resetPassword(req.body, (err, data) => {
        req.checkBody('password', 'password is not valid..!(Password length must be 5)').isLength({ min: 5 }).equals(req.body.confirmPassword);
        /**
         * @Purpose : Check the validation
        **/
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send({
                status: false,
                message: "Password and confirmpassword not match..!"
            });
        }
        else {
            if (err) {
                response.success = false;
                response.error = err;
                res.status(500).send(response);
            } else {
                response.success = true;
                response.data = data;
                response.message = "Password updated Successfully";
                res.status(200).send(response);
            }
        }
    });
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
