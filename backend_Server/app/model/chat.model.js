var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;

var chatSchema = new mongoSchema({
    senderUserId: { type: String },
    senderName: { type: String },
    receiverUserId: { type: String },
    receiverName: { type: String },
    message: { type: String }

}, {
        timestamps: true
    });
function chatModel() {
}

var chat = mongoose.model('chatInfo', chatSchema);
try {
    chatModel.prototype.addMessage = (chatData, callback) => {
        console.log('In backend chatmodel', chatData.senderUserId)
        const newMessage = new chat({
            senderUserId: chatData.senderUserId,
            senderName: chatData.senderName,
            receiverUserId: chatData.receiverUserId,
            receiverName: chatData.receiverName,
            message: chatData.message
        });
        console.log("newMessage data ==>", newMessage);

        newMessage.save((err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, result);
            }
        });
    }

}
catch (err) {
    console.log("Err: While data saved")
}
/**
 * @Purpose :  getUserMsg to fetch chat
 **/ 
try {
    chatModel.prototype.getUserMsg = (req, callback) => {
        chat.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data);
            }
        });
    }
}
catch (err) {
    console.log("Err: getUserMsg not found...!")
}

module.exports = new chatModel();