const chatServices = require("../services/chatServices");

try {
    module.exports.message = (req, callback) => {
        chatServices.addMessage(req, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    }
}
catch (err) {
    console.log("Error in sending message!",err);
}

try {
    module.exports. getUserMsg = (req, res) => {
        chatServices.getUserMsg(req, (err, data) => {
            var response = {};
            if (err) {
                response.success = false;
                response.error = err;
                res.status(500).send(response)
            } else {
                response.success = true;
                response.result = data;
                res.status(200).send(response)
            }
        });
    }
}
catch (err) {
    console.log("Error found in server chat controll!",err);
}
