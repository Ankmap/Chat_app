var jwt = require('jsonwebtoken');
try {
    var auth = function (req, res, next) {
        var token = req.headers["token"];
        jwt.verify(token, secret, function (err, decode) {
            if (err) {
                console.log(err)
                return res.status(401).send({
                    message : 'Unauthorised user'
                });
            }
            else {
                console.log(decode);
                next();
            }
        });
    }
}
catch (err) {
    console.log(err)
}
module.exports = auth;
