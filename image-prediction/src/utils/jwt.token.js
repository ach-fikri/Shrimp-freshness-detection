const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {ResponseError} = require('../error/response.error');
dotenv.config({path: './.env'});
const secret = process.env.SECRET;
const secretResetPassword = process.env.SECRET_RESET_PASSWORD;


const generateToken = async (data) => {
    return jwt.sign({
        id: data.id,
        name: data.name,
        email: data.email,
    }, secret, {
        expiresIn: '1d'
    });
}
const generateResetPasswordToken = async (data) => {
    return jwt.sign({
        id: data.id,
        email: data.email,
    }, secretResetPassword, {
        expiresIn: '5m'
    });
}
const verifyResetPasswordToken = async (token) => {
    try {
        return jwt.verify(token, secretResetPassword);
    } catch (error) {
        throw new ResponseError(401, false, 'Invalid token');
    }
}
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new ResponseError(401, false, 'Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken,
    verifyResetPasswordToken,
    generateResetPasswordToken
}