const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    predictions: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Saved = mongoose.model('Saved', savedSchema);
module.exports = {Saved};