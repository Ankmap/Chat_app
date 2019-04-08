const jwt = require('jsonwebtoken');
try{
   function generateToken(payload)
    {
        const token =  jwt.sign({payload}, 'secretkey', { expiresIn:120 }) // expires in 2 hours
        const result = {        
            success: true,
            message: 'Token Generated!!',
            token: token
        }
        return result;
    }
}catch(err){
    console.log("found error while generating token")
}

module.exports = {generateToken}
