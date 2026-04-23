const predictionService = require('../services/prediction.service');
const predict = async (req, res, next) => {
    try {
        const result = await predictionService.prediction(req.file);
        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const savePrediction = async (req, res, next) => {
    try {
        const data = {
            user_id: req.user_id,
            image: req.body.image,
            predictions: req.body.prediction
        }
        const result = await predictionService.savePrediction(data);
        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const getPrediction = async (req, res, next) => {
    try {
        const result = await predictionService.getPrediction(req.params.id);
        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}


const listPrediction = async (req, res, next) => {
    try {
        const result = await predictionService.listPrediction(req.user_id);
        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const removePrediction = async (req, res, next) => {
    try {
        const result = await predictionService.removePrediction(req.params.id);
        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}

module.exports = {
    predict,
    savePrediction,
    removePrediction,
    getPrediction,
    listPrediction
}