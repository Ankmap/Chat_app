const chatModel = require('../app/model/chat.model')

exports.addMessage = (req, callback) => {
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            console.log('Err : Backend Chat service',err);
            return callback(err)
        } else {
            console.log('Result : Backend Chat service');
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
