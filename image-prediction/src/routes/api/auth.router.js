const express = require('express')
const authControllers = require('../../controllers/auth.controller')
const {authMiddleware} = require("../../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post('/auth/register', authControllers.register)
authRouter.post('/auth/login', authControllers.login)
authRouter.post('/auth/logout',authMiddleware, authControllers.logout)
authRouter.post('/forget-password', authControllers.forgetPassword)
authRouter.post('/reset-password', authControllers.resetPassword)

module.exports=authRouter;