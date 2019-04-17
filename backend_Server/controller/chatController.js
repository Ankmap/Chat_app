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
                data.response = false;
                data.response = err;
                res.status(500).send(response)
            } else {
                data.response = true;
                data.response = data;
                res.status(200).send(response)
            }
        });
    }
}
catch (err) {
    console.log("Error found in server chat controll!",err);
}