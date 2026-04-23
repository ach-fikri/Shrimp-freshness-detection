const {ResponseError} = require('../error/response.error');

async function errorMiddleware (err, req, res, next){
    if(!err){
        next();
        return
    }
    if (err instanceof ResponseError) {
        return res.status(err.code).json({ 
            code: err.code,
            success: err.status,
            message: err.message
        }).end();
    }
    return res.status(500).json({
        code: err.code || 500,
        success: false,
        message: err.message,
    }).end();
    
};

module.exports = {
    errorMiddleware
}
