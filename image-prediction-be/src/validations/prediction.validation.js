const joi = require('joi')

const savePredValidation = joi.object({
    image : joi.string().required(),
    predictions : joi.string().required(),
})

module.exports = {
    savePredValidation
}