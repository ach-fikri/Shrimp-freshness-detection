const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');


const proccesImage = async (file) => {
    const imagePath = `./public/images/${file.filename}`;
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(imagePath)) {
            return reject(new Error('File tidak ditemukan'));
        }
        loadImage(imagePath).then((image) => {
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const input = tf.browser.fromPixels(canvas);
            const normalized = input.resizeBilinear([200,200]).reshape([1, 200, 200, 3]).toFloat().div(tf.scalar(255));
            resolve(normalized);
        })
        .catch((err) => {
            reject(err);
        })
    });
}

const predict = async (file) => {
    const input = await proccesImage(file);
    const model = await tf.loadGraphModel('file://./src/model-ml/model_uji_6_js/model.json');
    const prediction = await model.predict(input);
    return await prediction.data();
}

module.exports = {
    predict
}