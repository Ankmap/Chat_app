const chatModel = require('../app/model/chat.model')

exports.addMessage = (req, callback) => {
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            return callback(err)
        } else {
            console.log(data);
            return callback(null, data)
        }
    });
}

exports.getUserMsg = (req, callback) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    });
}
