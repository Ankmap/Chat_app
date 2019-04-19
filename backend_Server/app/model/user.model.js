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
 *            1)  A callback function is called at the compconstion of a given task.
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
                    console.log("Data saved successfully..!");
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

                    return callback(null, data);
                } else {
                    return callback("Incorrect password").status(500);
                }
            });
        } else {
            return callback("Invalid User ");
        }
    });
}
/**
 * @Purpose : For forgotPassword
**/
usermodel.prototype.forgotPassword=(data,callback)=>{
    user.findOne({"email":data.email},(err,result)=>{
        if(err) {
            return callback(err);
        }
        else {
            if(result!==null && data.email==result.email) {
                return callback(null,result);
            }
            else {
                return callback("Please enter register email id only..!")
            }
        }
    })
}
/**
 * @Purpose : For resetPassword
**/
usermodel.prototype.resetPassword = (req, callback) => {
    const newPassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(('newPassword =====>', newPassword));
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newPassword }, (err, result) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, result);
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