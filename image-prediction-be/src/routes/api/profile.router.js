const express = require('express');
const profileControllers = require('../../controllers/profile.controller')
const {authMiddleware} = require("../../middleware/auth.middleware");

const profileRouter = express.Router();

profileRouter.get('/profile', authMiddleware, profileControllers.profil);
profileRouter.put('/profile/update', authMiddleware, profileControllers.updateProfil);

module.exports = profileRouter