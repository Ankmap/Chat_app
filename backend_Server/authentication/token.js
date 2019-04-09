const jwt = require('jsonwebtoken');
try{
   function generateToken(payload)
    {
        const token =  jwt.sign({payload}, 'secretkey', { expiresIn:'2h' })
        const result = {        
            success: 'Welcome to the JWT Auth',
            message: 'Token Generated...!!',
            token: token
        }
        return result;
    }
}catch(err){
    console.log("found error while generating token")
}

module.exports = {generateToken}
