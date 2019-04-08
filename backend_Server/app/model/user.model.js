/**
 * @Purpose : 1) Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
 *            2) Hash plain password and store hashed password in database
 **/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;
// var access = require('../../authentication/token')

/**
 * @Purpose : Define a schema
 * 1) Schema maps to a MongoDB collection.
 **/
var mongoSchema = mongoose.Schema;
var userSchema = new mongoSchema({
    "name": { type: String, required: [true, "First name is required"] },
    "email": { type: String, required: [true, "Email is required"] },
    "password": { type: String, required: [true, "password is required"] }
},
    // {
    //     timestamps: true
    // }
);
function usermodel() {
}
/**
 * @Purpose : Compile our model
 **/
var user = mongoose.model('user', userSchema);
/**
 * @Purpose : Store hashed password in database
 **/
function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

usermodel.prototype.register = (body, callback) => {
    user.find({ 'email': body.email }, (err, data) => {
        if (err) {
            // console.log("user already present");
            return callback(err);
        } else if (data.length > 0) {
            response = {
                "error": true,
                "message": "Email already exists ",
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
            
            newUser.save((err, result) => {
                if (err) {
                    console.log("error in model file", err);
                    return callback(err);
                } else {
                    console.log("data save successfully", result);
                    return callback(null, result);
                }
            })
        }
    });
}

usermodel.prototype.login = (body, callback) => {
    user.findOne({ "email": body.email }, (err, data) => {
        //   console.log(data);
        if (err) {
            callback(err);
        } else if (data != null) {
            //console.log(data);
            bcrypt.compare(body.password, data.password).then(function (res) {
                if (res) {
                    console.log("login successfully");

                    /**
                     * @Purpose : If credentials are correct, return the data object
                     **/
                    callback(null, data);
                }
                else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
        }
        else {
            console.log("Incorrect password Or user");
            callback("Incorrect password Or user");
        }
    });
}
usermodel.prototype.forgotPassword = (body, callback) => {
     var email1 = body.email
     user.find({ "email": email1 }, (err, data) => {
         if (err) {
             return callback(err);
         } else if (data){
             return callback(null, data)
         }
         else {
             return callback("Invalid User ");
         }
     });
 }

usermodel.prototype.resetPassword  = (body, callback) => {
    const email = body.email
    user.find({'email':email}).then(function(data){
        if(!data){
            console.log(data)
            return callback('No user found with that email address');
        }
    })
}
module.exports = new usermodel();