var mongoose = require('mongoose');

var mongoSchema = mongoose.Schema;

var chatSchema = new mongoSchema({
    senderUserId: { type:String},
    senderName: {type:String},
    reciverUserId: { type:String},
    reciverName: { type:String},
    message:{ type:String}
});

function chatModel() {

}
var chat = mongoose.model('chatInfo', chatSchema);
try {
    chatModel.prototype.addMessage = (chatData, callback) => {
        console.log('chatData senderUserId---->', chatData.senderUserId)
        const newMsg = new chat({
            senderUserId: chatData.senderUserId,
            senderName: chatData.senderName,
            reciverUserId: chatData.reciverUserId,
            reciverName: chatData.reciverName,
            message: chatData.message
        });
        console.log("new Msg in model====>",newMsg);
        
        newMsg.save((err, result) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null,result);
            }
        });
    }
}
catch(err){
    console.log(err)
}

try {
    chatModel.prototype.getUserMsg = (req ,callback) => {
        chat.find({}, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data);
            }

        })
    }
}
catch(err){
    console.log(err)
}

module.exports = new chatModel();