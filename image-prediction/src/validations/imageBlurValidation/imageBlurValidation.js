const ImageValidator = require('./blurValidation');

async function testImage(imagePath) {
    // Buat instance dengan threshold default
    const validator = new ImageValidator({
        blurThreshold: 100,
        minHeight: 60,
        minWidth: 60
    });

    try {
        // Validasi gambar
        const result = await validator.validateImage(imagePath);
        // console.log('Hasil Validasi:', result);

        if (result.isValid) {
            return result
        } else {
          return result
        }

        // console.log('Metadata:', result.metadata);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function calibrateAndTest(file) {
    const imagePath = `./public/images/${file.filename}`;
    const validator = new ImageValidator();

    // Kalibrasi threshold menggunakan gambar contoh
    const recommendedThreshold = await validator.calibrateThreshold(
        ['./public/imageValidation/bagus1.jpg', './public/imageValidation/bagus.jpg'],  // Array path gambar tajam
        ['./public/imageValidation/blur.jpg', './public/imageValidation/blur.jpg']     // Array path gambar blur// Array path gambar blur
    );

    // console.log('Recommended threshold:', recommendedThreshold);

    // Gunakan threshold yang sudah dikalibrasi
    validator.options.blurThreshold = recommendedThreshold;

    // Test gambar
    return await testImage(imagePath);
}

module.exports = {calibrateAndTest}