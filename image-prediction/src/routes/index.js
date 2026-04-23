const express = require('express')
const authRouter = require("./api/auth.router");
const predicRouter = require("./api/prediction.router");
const profileRouter = require("./api/profile.router");

const router = express.Router();

router.use('/api', authRouter);
router.use('/api', predicRouter)
router.use('/api', profileRouter)


module.exports=router;