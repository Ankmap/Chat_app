/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - decode.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
const jwt = require('jsonwebtoken');

try {
    exports.checkToken =(req,res,next)=>{
        var token = req.headers['token'];
        if(token){
            jwt.verify(token, 'secretkey', (err,decoded)=>{
                if(err){
                    return res.send({
                        sucess:false,
                        message:"token not valid"
                    });
                }
                else{
                    req.decoded =decoded;
                    next();
                }
            });
        }
        else{
            return res.send({
                sucess:false,
                message:"token not provide"
            });
        }
    }
}
catch (err) {
    console.log("Error in decoded file:-->",err)
}

