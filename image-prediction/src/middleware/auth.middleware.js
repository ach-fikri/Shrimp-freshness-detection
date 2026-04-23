const {verifyToken} = require('../utils/jwt.token');
const {Token} = require("../models/token.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                code: 401,
                success: false,
                message: 'Unauthorized'
            });
        }
        const splitToken = token.split(' ')[1];
        const verify = await Token.findOne({token: splitToken});
        if (!verify) {
            return res.status(401).json({
                code: 401,
                success: false,
                message: 'Unauthorized'
            });
        }
        const data = await verifyToken(splitToken);
        req.user_id = data.id;
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    authMiddleware
}