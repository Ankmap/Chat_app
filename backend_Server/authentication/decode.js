const jwt = require('jsonwebtoken');
try {
    exports.checkToken =(req,res,next)=>{
        var token1 = req.headers['token'];
        if(token1){
            jwt.verify(token1, 'secretkey', (err,decoded)=>{
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
    console.log(err)
}

