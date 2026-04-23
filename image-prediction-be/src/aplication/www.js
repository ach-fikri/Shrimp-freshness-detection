const express = require('express')
const router = require('../routes/index')
const {dbConnection}= require('./db')
const cors = require('cors')
const {errorMiddleware} = require('../middleware/error.middleware');
const app = express();

dbConnection()
app.use(cors())
app.use(express.json());
app.use('/static',express.static('./public'))
app.use(router);
app.use((req, res) => res.status(404).json({
    code: 404,success:false, message: "Not Found"
}).end())

app.use(errorMiddleware);

module.exports = {
    app
}


