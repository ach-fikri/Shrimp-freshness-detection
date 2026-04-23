const dotenv = require('dotenv');
const {app} = require('./src/aplication/www');

dotenv.config({path: './.env'});

app.listen(process.env.PORT, '0.0.0.0',() => {
    console.log('Server on port', process.env.PORT);
})