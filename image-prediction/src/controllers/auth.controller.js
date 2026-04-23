const userService = require('../services/user.service')


const register = async (req, res, next)=>{
    try {
        const result = await userService.register(req.body);
        return res.status(201).json({
            code:201,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}

const login = async (req, res, next)=>{
    try {
        const result = await userService.login(req.body);
        return res.status(200).json({
            code:200,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}

const logout = async (req, res, next)=>{
    try {
        const result = await userService.logout(req.user_id);
        return res.status(200).json({
            code:200,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}

const forgetPassword = async (req, res, next)=>{
    try {
        const result = await userService.forgotPassword(req.body.email);
        return res.status(200).json({
            code:200,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}

const resetPassword = async (req, res, next)=>{
    try {
        console.log(req.body.token)
        const result = await userService.resetPassword(req.body.token, req.body.password);
        return res.status(200).json({
            code:200,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}
module.exports={
    register,
    login,
    logout,
    forgetPassword,
    resetPassword
}