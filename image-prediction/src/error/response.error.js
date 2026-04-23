class ResponseError extends Error{
    constructor(code, status, message) {
        super(message);
        this.code = code
        this.status = status;
    }
}

module.exports = {
    ResponseError
}