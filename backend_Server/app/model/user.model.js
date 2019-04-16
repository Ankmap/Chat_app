/**
 * @Purpose : 1) Required file
 *            2) Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
**/
const mongoose = require('mongoose');
/**
 * @Purpose : 1) Bcrypt is used for hash plain password and store hashed password in database.
 *            2) "salt round" mean the cost factor. 
 **/
const bcrypt = require('bcrypt')
const saltRounds = 10;
/**
 * @Purpose : Define a schema
 *            1) Schema maps to a MongoDB collection.
 **/
var mongoSchema = mongoose.Schema;
/**
 * @Purpose : Schema constructor.
 **/
var userSchema = new mongoSchema({
    "name": { type: String, required: [true, "Name is required"] },
    "email": { type: String, required: [true, "Email is required"] },
    "password": { type: String, required: [true, "password is required"] }
},
    {
        timestamps: true
    }
);
function usermodel() {
}
/**
 * @Purpose : Compile our model
 **/
var user = mongoose.model('user', userSchema);
/**
 * @Purpose : Encrypt the given password
 **/
function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}
/**
 * @Purpose : For register a new account
 *            1)  A callback function is called at the completion of a given task.
**/
usermodel.prototype.register = (body, callback) => {
    user.find({ 'email': body.email }, (err, data) => {
        if (err) {
            return callback(err);
        } else if (data.length > 0) {
            /**
             * @Purpose : It checks the given email is already registred or not.
             **/
            response = {
                "error": true,
                "message": "Email_Id already exists ",
                "errorCode": 404
            };
            return callback(response);
        }
        else {
            const newUser = new user({
                "name": body.name,
                "email": body.email,
                "password": hash(body.password)
            });
            /**
             * @Purpose : It saves the data to the database.
             **/
            newUser.save((err, result) => {
                if (err) {
                    return callback(err);
                } else {
                    console.log("Data saved successfully..!", result);
                    return callback(null, result);
                }
            })
        }
    });
}
/**
 * @Purpose : For login an account
**/
usermodel.prototype.login = (body, callback) => {
    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            return callback(err);
        } else if (data.length > 0) {
            bcrypt.compare(body.password, data[0].password, function (err, res) {
                if (err) {
                    return callback(err);
                } else if (res) {
                    console.log(data);
                    console.log("Login successfully...!");
                    return callback(null, data);
                } else {
                    return callback("Incorrect password").status(500);
                }
            });
        } else {
            console.log("Incorrect password Or user");
            return callback("Invalid User ");
        }
    });
}
/**
 * @Purpose : For forgotPassword
**/
usermodel.prototype.forgotPassword = (body, callback) => {
    /**
     * @Purpose : Store body.email in email1
    **/
    var email1 = body.email
    user.find({ "email": email1 }, (err, data) => {
        //   console.log(data);
        var response = {}
        if (err) {
            response ={
                status : false,
                message :'Invalid User'
            }
            return callback(response);
        } else{
            return callback(null, data)
        }
    });
}
/**
 * @Purpose : For resetPassword
**/
usermodel.prototype.resetPassword = (body, callback) => {
    newPassword = hash(body.password);
    user.updateOne({user_id: body._id }, { password: newPassword }, function (err, result) {
        if (err) {
            return callback(err);
        } else {
            return callback(null,result);
        }
    })
}
/**
 * @Purpose : Get all data
**/
usermodel.prototype.getAllUser = (req, callback) => {
    user.find({}, (err, data) => {
        if (err) {
            response = {
                "error": true,
                "message": "Error retriving data",
                "err": err
            };
            return callback(response)
        } else {
            callback(null, data);
        }
    })
}
/**
 * @Purpose : export usermodel
**/
module.exports = new usermodel();