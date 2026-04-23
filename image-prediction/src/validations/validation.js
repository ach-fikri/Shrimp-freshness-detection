const {ResponseError} = require('../error/response.error');
const validate = (schema, request) =>{
    const result = schema.validate(request,{
        abortEarly: false,
        allowUnknown: true
    })

    if(result.error){
        throw new ResponseError(400, false, result.error.message);
    }
    return result.value;
}

module.exports = {validate};