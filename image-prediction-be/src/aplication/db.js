const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const dbConnection = async () => {
    try {
        mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DBNAME}?authSource=admin&retryWrites=true`);
        console.info('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD');
    }
};

module.exports = {
    dbConnection
};