const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const yaml = require('js-yaml');
const MODEL_PATH = './src/model-ml/best_web_model/model.json';
const METADATA_PATH = './src/model-ml/best_web_model/metadata.yaml';

class ShrimpDetector {
    constructor() {
        this.model = null;
        this.metadata = null;
        this.inputSize = 640;
    }

    async loadModel() {
        try {
            console.log('Memuat model...');
            console.log(MODEL_PATH)
            this.model = await tf.loadGraphModel(`file://${MODEL_PATH}`);
            console.log('Model berhasil dimuat');

            const metadataFile = fs.readFileSync(METADATA_PATH, 'utf8');
            this.metadata = yaml.load(metadataFile);

            if (this.metadata.imgsz) {
                this.inputSize = Array.isArray(this.metadata.imgsz)
                    ? this.metadata.imgsz[0]
                    : this.metadata.imgsz;
            }
        } catch (error) {
            console.error('Error loading model or metadata:', error);
            throw error;
        }
    }

    async preprocessImage(imagePath) {
        const imageBuffer = fs.readFileSync(imagePath);
        const tfImage = tf.node.decodeImage(imageBuffer, 3);
        // Resize image
        const resized = tf.image.resizeBilinear(tfImage, [this.inputSize, this.inputSize]);
        const normalized = resized.div(255.0);
        const batched = normalized.expandDims(0);

        tfImage.dispose();
        resized.dispose();

        return batched;
    }

    async detectShrimp(file, confidenceThreshold = 0.25) {
        try {
            await this.loadModel();
            const imagePath = `./public/images/${file.filename}`;
            const inputTensor = await this.preprocessImage(imagePath);
            // console.log(inputTensor)
            const predictions = await this.model.predict(inputTensor);
            // console.log('Predictions structure:', predictions);
            // Check apakah ada deteksi udang
            const result = await this.checkShrimpPresence(predictions, confidenceThreshold);
            console.log(result)

            // Cleanup
            tf.dispose([inputTensor, predictions]);

            return result;
        } catch (error) {
            console.error('Error during detection:', error);
            throw error;
        }
    }

    async checkShrimpPresence(predictions, confidenceThreshold) {
        try {
            // Convert predictions tensor to array
            const predictionArray = await predictions.arraySync();
            // console.log(predictionArray[0])
            // Get the predictions for the first (and only) image in the batch
            const [scores, classes] = this.extractScoresAndClasses(predictionArray[0]);

            // Cari indeks class 'udang' dari metadata
            const shrimpClassIndex = Object.entries(this.metadata.names)
                .find(([_, name]) => name.toLowerCase() === 'udang')?.[0];

            if (shrimpClassIndex === undefined) {
                throw new Error('Class udang tidak ditemukan dalam metadata');
            }

            // Cek deteksi udang dengan confidence tertinggi
            let maxConfidence = 0;
            for (let i = 0; i < scores.length; i++) {
                if (classes[i] == shrimpClassIndex && scores[i] > maxConfidence) {
                    maxConfidence = scores[i];
                }
            }

            if (maxConfidence > confidenceThreshold) {
                return {
                    terdeteksi: true,
                    pesan: "Udang terdeteksi",
                    confidence: maxConfidence
                };
            }

            return {
                terdeteksi: false,
                pesan: "Udang tidak terdeteksi pada gambar ini",
                confidence: maxConfidence
            };
        } catch (error) {
            console.error('Error processing predictions:', error);
            throw error;
        }
    }

    extractScoresAndClasses(prediction) {
        // Untuk YOLO output [5, 8400]
        const numAnchors = prediction[0].length;
        const scores = [];
        const classes = [];
        // console.log(prediction)

        for (let i = 0; i < numAnchors; i++) {
            // Ambil confidence score dari channel ke-5
            const confidence = prediction[4][i];
            // console.log(confidence)
            // Class dengan confidence tertinggi
            const classIndex = 0; // Jika single class
            // Jika multi-class, uncomment baris di bawah
            // const classIndex = argMax(prediction.slice(5).map(channel => channel[i]));

            scores.push(confidence);
            classes.push(classIndex);
        }

        return [scores, classes];
    }
}

module.exports = ShrimpDetector;
