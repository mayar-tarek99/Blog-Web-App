const {StatusCodes, getReasonPhrase} = require("http-status-codes")
module.exports = (schema)=>{
    return(req,res,next)=>{
        var validation = []
        const requestHeaders = ["body", "params", "query"];
        requestHeaders.forEach((key) => {
            if(schema[key]){
              const validationResult = schema[key].validate(req[key]);
              if (validationResult.error) {
                validation.push(validationResult.error.details[0].message);
              }
            }
          });

        if(validation.length){
            res.status(StatusCodes.BAD_REQUEST)
            res.json({message:validation.join(),code:getReasonPhrase(StatusCodes.BAD_REQUEST)})
            return
        }
        next()
    }
}
