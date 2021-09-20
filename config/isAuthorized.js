var jwt = require('jsonwebtoken');
const {StatusCodes} = require("http-status-codes")

module.exports = ()=>{
    return(req,res,next)=>{
        let bareToken = req.headers.authorization
        if (bareToken){
            let token = bareToken.split(" ")[1] 
            var decoded = jwt.verify(token, "shhhhh");
            req.user = decoded; 
            next() 
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"you have to enter token"})
        }
        
    }
}