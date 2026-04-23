const sharp = require('sharp');

class ImageValidator {
    constructor(options = {}) {
        this.options = {
            blurThreshold: 1000, // Nilai default untuk Laplacian variance
            minWidth: 224,
            minHeight: 224,
            maxSize: 5 * 1024 * 1024, // 5MB
            ...options
        };
    }

    /**
     * Menghitung Laplacian variance untuk deteksi blur
     * @param {Buffer} data - Raw pixel data
     * @param {number} width - Image width
     * @param {number} height - Image height
     * @returns {number} - Variance score
     */
    calculateLaplacianVariance(data, width, height) {
        let variance = 0;
        let sum = 0;
        let count = 0;

        // Laplacian kernel
        const kernel = [
            [0,  1,  0],
            [1, -4,  1],
            [0,  1,  0]
        ];

        // Process each pixel (excluding borders)
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let pixelValue = 0;

                // Apply Laplacian kernel
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx));
                        pixelValue += data[idx] * kernel[ky + 1][kx + 1];
                    }
                }

                sum += pixelValue;
                variance += pixelValue * pixelValue;
                count++;
            }
        }

        // Calculate final variance
        const mean = sum / count;
        return (variance / count) - (mean * mean);
    }

    /**
     * Deteksi blur menggunakan Laplacian variance
     * @param {string|Buffer} imagePath - Path gambar atau buffer gambar
     * @returns {Promise<{isBlurry: boolean, blurScore: number}>}
     */
    async detectBlur(imagePath) {
        try {
            // Konversi gambar ke grayscale dan resize untuk konsistensi
            const image = sharp(imagePath)
                .grayscale()
                .resize(300, 300, { fit: 'fill' });

            // Dapatkan pixel data
            const { data, info } = await image
                .raw()
                .toBuffer({ resolveWithObject: true });

            // Hitung Laplacian variance
            const variance = this.calculateLaplacianVariance(data, info.width, info.height);

            // Normalisasi score untuk kemudahan interpretasi
            const normalizedScore = Math.min(variance / this.options.blurThreshold, 1);

            return {
                isBlurry: variance < this.options.blurThreshold,
                blurScore: normalizedScore,
                variance: variance
            };
        } catch (error) {
            throw new Error(`Error detecting blur: ${error.message}`);
        }
    }

    /**
     * Validasi gambar
     * @param {string|Buffer} imagePath - Path gambar atau buffer gambar
     * @returns {Promise<{isValid: boolean, issues: string[], metadata: object}>}
     */
    async validateImage(imagePath) {
        const result = {
            isValid: true,
            issues: [],
            metadata: {}
        };

        try {
            // Dapatkan metadata gambar
            const metadata = await sharp(imagePath).metadata();
            result.metadata = metadata;

            // Cek ukuran file
            if (metadata.size > this.options.maxSize) {
                result.issues.push(
                    `Ukuran file terlalu besar (max: ${this.options.maxSize / 1024 / 1024}MB)`
                );
            }

            // Cek dimensi minimum
            if (metadata.width < this.options.minWidth || metadata.height < this.options.minHeight) {
                result.issues.push(
                    `Dimensi gambar terlalu kecil (min: ${this.options.minWidth}x${this.options.minHeight}px)`
                );
            }

            // Deteksi blur
            const blurResult = await this.detectBlur(imagePath);
            result.metadata.blurScore = blurResult.blurScore;
            result.metadata.variance = blurResult.variance;

            if (blurResult.isBlurry) {
                result.issues.push(
                    `Gambar terlalu blur (variance: ${Math.round(blurResult.variance)}, threshold: ${this.options.blurThreshold})`
                );
            }

            // Update status valid
            result.isValid = result.issues.length === 0;

            return result;
        } catch (error) {
            throw new Error(`Validasi gambar gagal: ${error.message}`);
        }
    }

    /**
     * Kalibrasi threshold menggunakan set gambar contoh
     * @param {Array<string>} sharpImages - Array path gambar tajam
     * @param {Array<string>} blurryImages - Array path gambar blur
     * @returns {Promise<number>} - Threshold yang direkomendasikan
     */
    async calibrateThreshold(sharpImages, blurryImages) {
        const sharpScores = [];
        const blurryScores = [];

        // Analisis gambar tajam
        for (const img of sharpImages) {
            const result = await this.detectBlur(img);
            sharpScores.push(result.variance);
        }

        // Analisis gambar blur
        for (const img of blurryImages) {
            const result = await this.detectBlur(img);
            blurryScores.push(result.variance);
        }

        // Hitung threshold optimal
        const avgSharp = sharpScores.reduce((a, b) => a + b) / sharpScores.length;
        const avgBlurry = blurryScores.reduce((a, b) => a + b) / blurryScores.length;

        return (avgSharp + avgBlurry) / 2;
    }
}

module.exports = ImageValidator;