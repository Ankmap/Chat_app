var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;

var chatSchema = new mongoSchema({
    senderUserId: { type:String},
    senderName: {type:String},
    message:{ type:String},
    date :{type:Date, default:Date.now}
});
function chatModel() {
}

var chat = mongoose.model('chatInfo', chatSchema);

try {
    chatModel.prototype.addMessage = (chatData, callback) => {
        const newMsg = new chat({
            senderUserId: chatData.senderUserId,
            senderName: chatData.senderName,
            message: chatData.message,
            date: chatData.date
        });

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
    console.log("Error in schema:",err)
}

try {
    chatModel.prototype.getUserMsg = (req ,callback) => {
        chat.find({}, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data);
            }
        });
    }
}
catch(err){
    console.log("Error in getUserMsg:",err)
}

module.exports = new chatModel();