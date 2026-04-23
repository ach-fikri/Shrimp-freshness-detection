const userService = require('../services/user.service')
const profil = async (req, res, next) =>{
    try {
        const result = await userService.profile(req.user_id);
        return res.status(200).json({
            code:200,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}

const updateProfil = async (req, res, next) => {
    try {
        const result = await userService.updateProfile(req.user_id, req.body);
        return res.status(200).json({
            code:200,
            success: true,
            data: result
        })
    }catch (e) {
        next(e)
    }
}

module.exports = {
    profil,
    updateProfil
}