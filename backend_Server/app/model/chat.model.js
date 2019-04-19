var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;
/**
 * @Purpose :  Create schema
 **/ 
var chatSchema = new mongoSchema({
    senderUserId: { type: String },
    senderName: { type: String },
    receiverUserId: { type: String },
    receiverName: { type: String },
    message: { type: String },
    date :{type:Date, default:Date.now}
}, {
        timestamps: true
    });
function chatModel() {
}
/**
 * @Purpose :  chatInfo is collection in chatpp and store in chat var
 **/
var chat = mongoose.model('chatInfo', chatSchema);
try {
    chatModel.prototype.addMessage = (chatData, callback) => {
        console.log('\n In backend chatmodel', chatData.senderUserId, "\n")
        /**
         * @Purpose :  newMessage is object of chat
         **/
        const newMessage = new chat({
            senderUserId: chatData.senderUserId,
            senderName: chatData.senderName,
            receiverUserId: chatData.receiverUserId,
            receiverName: chatData.receiverName,
            message: chatData.message,
            date:chatData.date
        });
        console.log("newMessage data ==>", newMessage);
        /**
         * @Purpose :  Saved data in newMessage
         **/
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
    console.log("Err: While data saved",err)
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