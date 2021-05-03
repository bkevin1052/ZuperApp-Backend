const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

//Redis - Cache
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: path.resolve(__dirname+'/.env')});
}

// Initializations
const app = express();
require('./database');

// settings
app.set('port', process.env.PORT || 2021);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(responseTime());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ROUTES
app.get('/', (req,res) => res.send('ZuperApp - BackEnd'));

//Usuario
app.use('/api', require('./routes/login'));

//Lista
app.use('/api/lists', require('./routes/lists'));

//Servicios
app.use('/api/services', require('./routes/services'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});