var userService = require('../services/userService');

module.exports.register = (req, res) => {
    req.checkBody('name', 'name is not valid').notEmpty();
    req.checkBody('email', 'Email is not valid').notEmpty();
    req.checkBody('password', 'password is not valid').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);

    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
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
    userService.login(req.body, (err, result) => {
        if (err) {
            response.success = false;
            response.error = err;
            res.status(500).send(response);
        }
        else {
            response.success = true;
            response.result = result;
            res.status(200).send(response);
        }
    })
}


