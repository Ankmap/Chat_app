/**
 * @Purpose : To create token
 * 1 ) Load jwt in our dependencies
 */
const jwt = require('jsonwebtoken');
try{
   function generateToken(payload)
    {
        const token =  jwt.sign({payload}, 'secretkey', { expiresIn:'2h' })
        const result = {        
            success: 'true',
            message: 'Token Generated...!!',
            token: token
        }
        return result;
    }
}catch(err){
    console.log("Found error while generating token")
}

module.exports = {generateToken}
