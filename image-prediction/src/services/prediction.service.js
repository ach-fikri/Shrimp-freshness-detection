const {ResponseError} = require("../error/response.error");
const {predict} = require("../utils/prediction");
const ShrimpDetector = require('../utils/schrimDetect');
const {savePredValidation} = require("../validations/prediction.validation")
const {calibrateAndTest} = require('../validations/imageBlurValidation/imageBlurValidation')
const {Saved} = require("../models/saved.model");
const {validate} = require("../validations/validation");



const prediction = async (file) => {
    if (!file) {
        throw new ResponseError(400, false, 'No file uploaded');
    }
    const vilid = await calibrateAndTest(file)
    if (vilid.isValid === false) {
        throw new ResponseError(400, false, vilid.issues.map(issue => issue.replace(/\s*\([^)]*\)/g, '')));
    }
    const detector = new ShrimpDetector();
    const result = await detector.detectShrimp(file, 0.60);
    if (result.terdeteksi === false) {
        throw new ResponseError(400, false, result.pesan);
    }
    const prediction = await predict(file);
    const probability = prediction[0];
    const predictedClass = probability >= 0.5 ? 1 : 0;
    const label = predictedClass === 1 ? 'Tidak Segar' : 'Segar';
    return {
        image: file.filename,
        probability: probability,
        predictedClass: predictedClass,
        label: label
    }
}

const savePrediction = async (data) => {
    const d = validate(savePredValidation, data);
    const newPrediction = new Saved(d);

    try {
        const result = await newPrediction.save();
        return result
    } catch (e) {
        throw new ResponseError(500, false, e.message);
    }
}

const removePrediction = async (id) => {
    const result = await Saved.deleteOne({_id: id});
    if (!result.deletedCount) {
        throw new ResponseError(404, false, 'Prediction not found');
    }
    return true

}

const getPrediction = async (id) => {
    const result = await Saved.findOne({_id: id});
    if (!result) {
        throw new ResponseError(404, false, 'Prediction not found');
    }
    return result
}
const listPrediction = async (id) => {
    const result = await Saved.find({user_id: id});
    return result
}

module.exports = {
    prediction,
    savePrediction,
    removePrediction,
    listPrediction,
    getPrediction
}