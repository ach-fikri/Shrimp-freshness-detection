const expreess = require('express');
const predictControllers = require('../../controllers/prediction.controller')
const {authMiddleware} = require("../../middleware/auth.middleware");
const {upload} = require("../../middleware/multer.middleware");

const predicRouter = expreess.Router();

predicRouter.post('/predict', authMiddleware, upload.single('image'), predictControllers.predict);
predicRouter.post('/predict/save', authMiddleware, predictControllers.savePrediction);
predicRouter.delete('/predict/remove/:id', authMiddleware, predictControllers.removePrediction);
predicRouter.get('/predict/list', authMiddleware, predictControllers.listPrediction);
predicRouter.get('/predict/:id', authMiddleware, predictControllers.getPrediction);


module.exports =predicRouter;